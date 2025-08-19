/** 适配器模式 */

class API {
  constructor(adapter = new FetchAdapter()) {
    this.adapter = adapter
  }

  get(endpoint) {
    return this.adapter.get(endpoint).catch(error => {
      alert(`${this.adapter.constructor.name}: ${error}`)
    })
  }
};

class FetchAdapter {
  _handleError(res) {
    return res.ok ? res : Promise.reject(res.status)
  }

  get(endpoint) {
    return window.fetch(endpoint).then(this._handleError).then(res => res.json())
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

  get(endpoint) {
    return new Promise((resolve, reject) => {
      this.request.open('get', endpoint)
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
const fetchApi = new API()
fetchApi.get('user')

// 使用ajax
const ajaxAPI = new API(new AjaxAdapter())
ajaxAPI.get('user')
