'use strict'

import { app, BrowserWindow, Menu, ipcMain } from 'electron'

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
