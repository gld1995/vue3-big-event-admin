import request from '@/utils/request'

export const userRegisterService = ({ username, password, repassword }: any) =>
  request.post('api/reg', { username, password, repassword })

export const userLoginService = ({ username, password }: any) =>
  request.post('api/login', { username, password })

export const userGetInfoService = () => request.get('/my/userinfo')

export const userUpdateInfoService = ({ id, nickname, email }: any) =>
  request.put('/my/userinfo', { id, nickname, email })

export const userUploadAvatarService = (avatar: string) =>
  request.patch('/my/update/avatar', { avatar })

export const userUpdatePassService = ({
  oldPassword,
  newPassword,
  confirmPassword
}: any) =>
  request.patch('/my/updatepwd', {
    old_pwd: oldPassword,
    new_pwd: newPassword,
    re_pwd: confirmPassword
  })
