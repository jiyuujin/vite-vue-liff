import { onMounted, ref } from 'vue'

export type Status = 'signin' | 'inited';

export const useLine = () => {
  const liffObject = ref<any | null>(null)
  const status = ref<Status>('signin')

  const login = () => {
    liffObject.value?.login({})
  }

  const logout = () => {
    liffObject.value?.logout()
  }

  onMounted(() => {
    if (status.value === 'inited') return

    import('@line/liff').then((liff: any) => {
      liff
        .init({ liffId: import.meta.env.VITE_LIFF_ID })
        .then(() => {
          liffObject.value = liff
          if (liff.isLoggedIn()) status.value = 'inited'
        })
        .catch((err: any) => {
          console.error({ err })
        })
    })
  })

  return {
    liffObject,
    status,
    login,
    logout,
  }
}
