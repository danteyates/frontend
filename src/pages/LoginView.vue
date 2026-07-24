<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const handleSubmit = async (): Promise<void> => {
  const success = await authStore.login({
    email: form.email,
    password: form.password,
  })

  if (success) {
    await router.push({
      name: 'dashboard',
    })
  }
}
</script>

<template>
  <main>
    <h1>Giriş yap</h1>

    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">
          E-posta
        </label>

        <input
          id="email"
          v-model.trim="form.email"
          type="email"
          autocomplete="email"
          required
        />

        <small v-if="authStore.errors.email">
          {{ authStore.errors.email[0] }}
        </small>
      </div>

      <div>
        <label for="password">
          Şifre
        </label>

        <input
          id="password"
          v-model="form.password"
          type="password"
          autocomplete="current-password"
          required
        />

        <small v-if="authStore.errors.password">
          {{ authStore.errors.password[0] }}
        </small>
      </div>

      <p v-if="authStore.error">
        {{ authStore.error }}
      </p>

      <button
        type="submit"
        :disabled="authStore.loading"
      >
        {{
          authStore.loading
            ? 'Giriş yapılıyor...'
            : 'Giriş yap'
        }}
      </button>
    </form>
      <RouterLink to="/register">
      Hesabın yok mu? Kayıt ol
    </RouterLink>
  </main>
</template>