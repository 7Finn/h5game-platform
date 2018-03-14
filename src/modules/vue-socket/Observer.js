import Emitter from './Emitter'
import Socket from 'socket.io-client'

export default class {
  constructor (connection, store) {
    if (typeof connection === 'string') {
      this.Socket = Socket(connection)
    } else {
      this.Socket = connection
    }

    if (store) this.store = store

    this.onEvent()
  }

  onEvent () {
    var superOnevent = this.Socket.onevent
    this.Socket.onevent = (packet) => {
      superOnevent.call(this.Socket, packet)

      Emitter.emit(packet.data[0], packet.data[1])

      if (this.store) this.passToStore('SOCKET_' + packet.data[0], packet.data[1])
    }

    let _this = this
    const sys = ['connect', 'error', 'disconnect', 'reconnect', 'reconnect_attempt', 'reconnecting', 'reconnect_error', 'reconnect_failed', 'connect_error', 'connect_timeout', 'connecting', 'ping', 'pong']
    sys.forEach((value) => {
      _this.Socket.on(value, (data) => {
        Emitter.emit(value, data)
        if (_this.store) _this.passToStore('SOCKET_' + value, data)
      })
    })
  }

  passToStore (event, payload) {
    if (!event.startsWith('SOCKET_')) return

    let mutation = event.toUpperCase().split('/').pop()
    if (this.store._mutations[mutation]) {
      this.store.commit(mutation, payload)
    }

    let action = 'socket_' + event.replace('SOCKET_', '')
      .toLowerCase()
      .replace(/[\W\s_]+(\w)/g, (match, p1) => p1.toUpperCase()).split('/').pop()
    if (this.store._actions[action]) {
      this.store.dispatch(action, payload)
    }
  }
}
