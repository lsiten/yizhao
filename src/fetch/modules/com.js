import fetch from '../api'
export default {
  /* 获取微信认证 */
  getWxConfig (params) {
    return fetch('/index/getWxConfig', params)
  },
  /* 获取微信认证 */
  checkDeskId (params) {
    return fetch('/index/checkDeskId', params)
  },
  /* 获取图片token */
  getImageToken (params) {
    return fetch('/index/getToken', params)
  }
}
