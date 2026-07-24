<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.user) {
    const success = await authStore.fetchUser()

    if (!success) {
      await router.push({
        name: 'login',
      })
    }
  }
})

const handleLogout = async (): Promise<void> => {
  await authStore.logout()

  await router.push({
    name: 'login',
  })
}
</script>

<template>
  <main>
    <h1>Dashboard</h1>

    <div v-if="authStore.loading">
      Kullanıcı bilgileri yükleniyor...
    </div>

    <div v-else-if="authStore.user">
      <p>
        Hoş geldin, {{ authStore.user.name }}
      </p>

      <p>
        E-posta: {{ authStore.user.email }}
      </p>

      <p>
        Rol: {{ authStore.user.role }}
      </p>

      <button
        type="button"
        @click="handleLogout"
      >
        Çıkış yap
      </button>
    </div>
  </main>
</template>