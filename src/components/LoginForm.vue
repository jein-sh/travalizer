<template>
    <div class="entry__subtitle">Welcome Back, Please login to your account</div>
    <div class="entry__form">
        <form @submit.prevent="login">
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
        <div class="entry__actions">
            <CustomToggle
                name="remember"
                label="Remember me"
            />
            <a href="#" class="entry__forgot">Forgot password?</a>
            <Button type="submit" text="Login" />
            <router-link to="/register" class="btn btn--bordered" :loading="loading">Sign up</router-link>
        </div>
        </form>
        <div class="entry__links">
            <span class="entry__text">Or, login with</span>
            <a href="#" class="entry__link">Facebook</a>
            <a href="#" class="entry__link">Linked In</a>
            <a href="#" class="entry__link">Google</a>
        </div>
    </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { signInWithEmailAndPassword } from 'firebase/auth'
  import { auth } from '../firebase'
  import { useRouter } from 'vue-router'
  import CustomInput from './ui/CustomInput.vue'
  import CustomToggle from './ui/CustomToggle.vue'
  import Button from './ui/Button.vue'

  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const loading = ref(false)


  const login = async () => {
    loading.value = true
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      router.push('/parks')
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>

<style scoped>

.entry__subtitle {
  font-size: 16px;
  line-height: 130%;
  color: #58745E;
  margin-bottom: 32px;
}

.entry__form form {
  width: 100%;
}

.entry__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.entry__forgot {
  font-size: 16px;
  line-height: 100%;
  text-align: right;
  text-decoration-line: underline;
  text-underline-offset: 3px;
  transition: opacity 0.3s ease;
}

.entry__forgot:hover {
  opacity: 0.7;
}

.entry__links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  margin-top: 56px;
}

.entry__text {
  font-size: 16px;
  line-height: 100%;
  color: #58745E;
}

.entry__link {
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  color: #355B3E;
}

.entry__link:hover {
  opacity: 0.7;
}

@media(max-width: 767px) {
  .entry__links {
    text-align: center;
    justify-content: space-around;
    gap: 24px 12px;
  }

  .entry__text {
    width: 100%;
  }
}

@media(max-width: 359px) {
  .entry__actions {
    grid-template-columns: 1fr;
  }

  .entry__forgot {
    text-align: left;
  }
}
</style>
