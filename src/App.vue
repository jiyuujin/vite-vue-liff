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
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          <button @click="() => status === 'inited' ? logout() : login()">
            {{ status === 'inited' ? 'You are signed to your account' : 'Sign in to your account' }}
          </button>
        </h2>
        <h3 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          LIFF Info
        </h3>
        <ul class="list-none text-center p-0 m-0">
          <li class="p-1 border">
            <img
              className="mx-auto h-12 w-auto"
              :src="pictureUrl"
              :alt="`${displayName} logo`"
            />
          </li>
          <li class="p-1 border">
            <strong>Login Status</strong>
            :<span class="m-1">{{ status }}</span>
          </li>
          <li class="p-1 border">
            <strong>Language</strong>
            :<span class="m-1">{{ language }}</span>
          </li>
          <li class="p-1 border">
            <strong>OS</strong>
            :<span class="m-1">{{ os }}</span>
          </li>
          <li class="p-1 border">
            <strong>LIFF Ver</strong>
            :<span class="m-1">{{ version }}</span>
          </li>
          <li class="p-1 border">
            <strong>LINE Ver</strong>
            :<span class="m-1">{{ lineVersion }}</span>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useLine } from './composables/useLine'
import { useLineInfo } from './composables/useLineInfo'

const { liffObject, status, login, logout } = useLine()
const {
  profile: { displayName, pictureUrl },
  language,
  os,
  version,
  lineVersion,
} = useLineInfo({
  liff: liffObject,
  status: status.value,
})
</script>
