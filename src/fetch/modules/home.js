import fetch from '../api'
export default {
  article_submit (params) {
    return fetch('/article/addArtice', params)
  }
}
