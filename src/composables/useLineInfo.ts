import { ref } from 'vue'
import { Status } from './useLine'

interface UseLineInfoProps {
  liff: any | null;
  status: Status;
}

export const useLineInfo = ({ liff, status }: UseLineInfoProps) => {
  const displayName = ref('')
  const pictureUrl = ref('')

  if (status !== 'inited')
    return { profile: { displayName, pictureUrl }, version: '' }

  liff
    ?.getProfile()
    .then((profile: any) => {
      displayName.value = profile.displayName
      pictureUrl.value = profile.pictureUrl
    })
    .catch((err: any) => {
      console.error({ err })
    })

  const language = liff?.getLanguage()

  const os = liff?.getOS()

  const version = liff?.getVersion()

  const lineVersion = liff?.getLineVersion()

  return {
    profile: { displayName, pictureUrl },
    language,
    os,
    version,
    lineVersion,
  }
}
