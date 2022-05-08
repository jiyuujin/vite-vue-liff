<template>
  <main>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <h1 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Liff Demo
        </h1>
        <p class="text-center">
          LIFF init succeeded.
        </p>
        <h3 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          LIFF Info
        </h3>
        <ul class="list-none text-center p-0 m-0">
          <li class="p-1 border">
            <strong>LIFF Browser</strong>
            :<span>{{ liffObject?.isInClient() }}</span>
          </li>
          <li class="p-1 border">
            <strong>Login Status</strong>
            :<span class="m-1">{{ liffObject?.isLoggedIn() }}</span>
          </li>
          <li class="p-1 border">
            <strong>Language</strong>
            :<span class="m-1">{{ liffObject?.getLanguage() }}</span>
          </li>
          <li class="p-1 border">
            <strong>OS</strong>
            :<span class="m-1">{{ liffObject?.getOS() }}</span>
          </li>
          <li class="p-1 border">
            <strong>LIFF Ver</strong>
            :<span class="m-1">{{ liffObject?.getVersion() }}</span>
          </li>
          <li class="p-1 border">
            <strong>LINE Ver</strong>
            :<span class="m-1">{{ liffObject?.getLineVersion() }}</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LiffInspectorPlugin from '@line/liff-inspector'
import { LiffMockPlugin } from '@line/liff-mock'

const liffObject = ref()
const profileName = ref({})

const setLiffPlugins = (liff: any) => {
  liff.use(
    new LiffInspectorPlugin({
      origin: import.meta.env.VITE_LIFF_INSPECTOR_ORIGIN
        ? import.meta.env.VITE_LIFF_INSPECTOR_ORIGIN
        : 'ws://localhost:9222',
    }),
  )
  liff.use(new LiffMockPlugin())
}

const setLiffMock = (liff: any) => {
  liff.$mock.set((p) => ({
    ...p,
    getProfile: { displayName: '[mock] Test', userId: '1234' },
  }))
}

onMounted(() => {
  import('@line/liff').then((liff: any) => {
    liff
      .init({ liffId: import.meta.env.VITE_LIFF_ID })
      .then(() => {
        liffObject.value = liff
        setLiffPlugins(liff)
        setLiffMock(liff)
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile: any) => {
              profileName.value = profile.displayName
            })
            .catch((err: any) => {
              console.error({ err })
            })
        }
      })
      .catch((err: any) => {
        console.error({ err })
      })
  })
})
</script>
