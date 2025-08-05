import request from '@/utils/request'

export const userRegisterService = ({ username, password, repassword }: any) =>
  request.post('api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }: any) =>
  request.post('api/login', { username, password })

export const userGetInfoService = () => request.get('/my/userinfo')
