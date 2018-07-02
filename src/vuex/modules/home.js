import api from '../../fetch/modules/home'
import * as types from '../types'
const state = {
  title: '',
  content: ''
}
const getters = {
  home_get_title: state => state.title,
  home_get_content: state => state.content
}

const mutations = {
  [types.HOME_SET_TITLE] (state, title) {
    state.title = title
  },
  [types.HOME_SET_CONTENT] (state, content) {
    state.content = content
  }
}

const actions = {
  home_set_title ({ commit }, title) {
    commit(types.HOME_SET_TITLE, title)
  },
  home_set_content ({ commit }, content) {
    commit(types.HOME_SET_CONTENT, content)
  },
  home_submit_article ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.article_submit(api).then(data => {
        let code = parseInt(data.code)
        if (code === 1) {
          resolve(data)
        } else {
          reject(data)
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
