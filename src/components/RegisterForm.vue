<template>
  <div class="entry__subtitle">Create your account</div>
  <div class="entry__form">
    <form @submit.prevent="register">
      <CustomInput
          type="email"
          placeholder="Email address"
          label="Email"
          v-model="email"
      />
      <CustomInput
          type="password"
          placeholder="Enter password"
          label="Password"
          v-model="password"
      />
      <CustomInput
          type="password"
          placeholder="Enter password"
          label="Confirm password"
          v-model="confirmPassword"
      />
      <div class="entry__actions">
          <router-link to="/login" class="btn btn--bordered">Back to Login</router-link>
          <Button type="submit" text="Sign up" :loading="loading"/>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { auth } from '../firebase'
  import { createUserWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  import CustomInput from './ui/CustomInput.vue'
  import Button from './ui/Button.vue'

  const loading = ref(false)
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const router = useRouter()

  const register = async () => {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }

    loading.value = true

    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value)
      router.push('/parks')
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>

.entry__form form {
  width: 100%;
}

.entry__subtitle {
  font-size: 16px;
  line-height: 130%;
  color: #58745E;
  margin-bottom: 32px;
}

.entry__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media(max-width: 359px) {
  .entry__actions {
    grid-template-columns: 1fr;
  }
}

</style>
