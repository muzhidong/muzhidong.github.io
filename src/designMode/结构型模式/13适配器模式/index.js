/** 采用适配器模式，发起请求时供选择使用fetch还是XMLHttpRequest */
class Request {
  constructor(adapter = new FetchAdapter()) {
    this.adapter = adapter
  }

  get(url) {
    return this.adapter.get(url).catch(error => {
      alert(`${this.adapter.constructor.name}: ${error}`)
    })
  }
};

class FetchAdapter {
  _handleError(res) {
    return res.ok ? res : Promise.reject(res.status)
  }

  get(url) {
    return window.fetch(url).then(this._handleError).then(res => res.json())
  }
};

class AjaxAdapter {
  constructor() {
    this.request = new XMLHttpRequest()
  }

  _response(res, resolve, reject) {
    res = res.target || res.currentTarget
    if (res.readyState === 4 && res.status === 200) {
      try {
        resolve(JSON.parse(res.response))
      } catch (e) {
        resolve(res.response)
      }
    } else {
      reject(`request status is ${res.status}`)
    }
  }

  get(url) {
    return new Promise((resolve, reject) => {
      this.request.open('get', url)
      this.request.onreadystatechange = (res) => {
        new Promise((resolve, reject) => {
          this._response(res, resolve, reject)
        }).then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      }
      this.request.send()
    })
  }
};


// 使用fetch
const fetchRequest = new Request()
fetchRequest.get('/test')

// 使用ajax
const ajaxRequest = new Request(new AjaxAdapter())
ajaxRequest.get('/test')
