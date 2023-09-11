import request from '@/utils/request'

// 注册接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

// 登录接口
export const userLoginService = ({ username, password }) => {
  return request.post('/employee/login', { username, password })
}

// 登出接口
export const userLogoutService = () => {
  return request.post('/employee/logout')
}