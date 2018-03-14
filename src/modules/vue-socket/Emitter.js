export default new class {
  constructor () {
    this.listenersMap = new Map()
  }

  addListener (label, callback, vm) {
    if (typeof callback === 'function') {
      this.listenersMap.has(label) || this.listenersMap.set(label, [])
      this.listenersMap.get(label).push({ callback: callback, vm: vm })
      return true
    }
    return false
  }

  removeListener (label, callback, vm) {
    let listeners = this.listenersMap.get(label)
    let index

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        const result = (typeof listener.callback === 'function' && listener.callback === callback && listener.vm === vm)
          ? i = index : i
        return result
      }, -1)

      if (index > -1) {
        listeners.splice(index, 1)
        this.listenersMap.set(label, listeners)
        return true
      }
    }
    return false
  }

  emit (label, ...args) {
    let listeners = this.listenersMap.get(label)

    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        listener.callback.call(listener.vm, ...args)
      })
      return true
    }
    return false
  }
}()
