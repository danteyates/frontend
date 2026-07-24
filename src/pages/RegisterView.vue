<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  device_name: 'frontend',
})

const submit = async () => {
  const success = await authStore.register(form)

  if (success) {
    router.push('/dashboard')
  }
}
</script>

<template>
  <main>
    <h1>Kayıt Ol</h1>

    <form @submit.prevent="submit">
      <input
        v-model="form.name"
        type="text"
        placeholder="Ad"
      />

      <input
        v-model="form.email"
        type="email"
        placeholder="E-posta"
      />

      <input
        v-model="form.password"
        type="password"
        placeholder="Şifre"
      />

      <input
        v-model="form.password_confirmation"
        type="password"
        placeholder="Şifre tekrar"
      />

      <button
        type="submit"
        :disabled="authStore.loading"
      >
        {{ authStore.loading ? 'Kaydediliyor...' : 'Kayıt Ol' }}
      </button>

      <p v-if="authStore.error">
        {{ authStore.error }}
      </p>
    </form>

    <RouterLink to="/login">
      Zaten hesabın var mı? Giriş yap
    </RouterLink>
  </main>
</template>