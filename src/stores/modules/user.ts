import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const user = ref({})
    const token = ref('')

    const setToken = (newToken: string) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    const getUserInfo = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
      console.log(res)
    }

    const setUser = (userInfo: any) => (user.value = userInfo)

    return {
      user,
      token,
      setToken,
      removeToken,
      getUserInfo,
      setUser
    }
  },
  {
    persist: true
  }
)
