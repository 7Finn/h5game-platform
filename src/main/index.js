'use strict'

import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
const log = require('electron-log')

// -------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
// -------------------------------------------------------------------
autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let frameWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * 初始化主线程
   */
  Menu.setApplicationMenu(null)

  mainWindow = new BrowserWindow({
    height: 563,
    // useContentSize: true,
    show: false,
    width: 1000
  })

  mainWindow.maximize()

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  updateHandle()
}

function createIframeWindow (arg) {
  /**
   * 创建对战窗口
   */
  Menu.setApplicationMenu(null)

  frameWindow = new BrowserWindow({
    height: 563,
    // useContentSize: true,
    show: false,
    width: 1000
  })

  frameWindow.maximize()

  frameWindow.loadURL(arg.url)

  frameWindow.on('closed', () => {
    frameWindow = null
  })

  frameWindow.webContents.on('did-finish-load', () => {
    frameWindow.webContents.send('init', arg.init)
  })

  frameWindow.on('ready-to-show', () => {
    frameWindow.show()
    frameWindow.focus()
  })
}

function updateHandle () {
  let message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }

  // autoUpdater.setFeedURL('https://github.com/7Finn/h5game-platform/tree/master/build/publish/')
  autoUpdater.on('error', () => {
    sendUpdateMessage(message.error)
  })
  autoUpdater.on('checking-for-update', () => {
    sendUpdateMessage(message.checking)
  })
  autoUpdater.on('update-available', (info) => {
    sendUpdateMessage(message.updateAva)
  })
  autoUpdater.on('update-not-available', (info) => {
    sendUpdateMessage(message.updateNotAva)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', (progressObj) => {
    mainWindow.webContents.send('downloadProgress', progressObj)
  })
  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
    ipcMain.on('isUpdateNow', (e, arg) => {
      // some code here to handle event
      autoUpdater.quitAndInstall()
    })
    mainWindow.webContents.send('isUpdateNow')
  })

  // 执行自动更新检查
  autoUpdater.checkForUpdatesAndNotify()
  // autoUpdater.checkForUpdates()
}

function sendUpdateMessage (text) {
  mainWindow.webContents.send('update-info', text)
}

ipcMain.on('open-iframe', (event, arg) => {
  createIframeWindow(arg)
})

ipcMain.on('close-iframe', (event, arg) => {
  frameWindow.close()
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
