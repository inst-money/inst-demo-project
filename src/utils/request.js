import axios from 'axios'
import { getToken } from '@/utils/auth'
import i18n from '@/i18n'
import { showToast } from '@/components/toast'
import router from '@/router'

const getErrorMsg = (code) => {
  const locale = i18n.t(`code${code}`)
  if (locale.indexOf('code') === 0) {
    return ''
  }
  return locale
}

const service = axios.create({
  baseURL: 'http://175.41.179.89',
  timeout: 30000,
})

const checkLoginStatus = (code) => {
  if (code === 301004) {
    router.push({
      path: 'login',
      query: {
        code: localStorage.getItem('railone-code'),
      },
    })
  }
}

service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.token = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 0) {
      showToast(getErrorMsg(res.code) || res.msg || 'Error')
      checkLoginStatus(res.code)
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error) => {
    const hasResCode =
      error.response && error.response.data && error.response.data.code

    if (hasResCode) {
      const { data } = error.response
      showToast(getErrorMsg(data.code) || data.msg || 'Error')
      checkLoginStatus(data.code)
    } else {
      showToast(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
