import api from '../../fetch/modules/home'
import * as types from '../types'
const state = {
  title: '',
  content: '',
  author: '',
  wx: ''
}
const getters = {
  home_get_title: state => state.title,
  home_get_content: state => state.content,
  home_get_author: state => state.author,
  home_get_wx: state => state.wx
}

const mutations = {
  [types.HOME_SET_TITLE] (state, title) {
    state.title = title
  },
  [types.HOME_SET_CONTENT] (state, content) {
    state.content = content
  },
  [types.HOME_SET_AUTHOR] (state, author) {
    state.author = author
  },
  [types.HOME_SET_WEIXIN] (state, wx) {
    state.wx = wx
  }
}

const actions = {
  home_set_title ({ commit }, title) {
    commit(types.HOME_SET_TITLE, title)
  },
  home_set_content ({ commit }, content) {
    commit(types.HOME_SET_CONTENT, content)
  },
  home_set_author ({ commit }, author) {
    commit(types.HOME_SET_AUTHOR, author)
  },
  home_set_wx ({ commit }, wx) {
    commit(types.HOME_SET_WEIXIN, wx)
  },
  home_submit_article ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.article_submit(params).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          resolve(data)
        } else {
          reject(data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
