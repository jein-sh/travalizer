<template>
    <header class="header">
        <div class="container">
            <div class="header__wrap">
                <Logo />
                <Button text="Logout" mod="bordered" @click="logout" />
            </div>
        </div>
    </header>
</template>

<script setup>
    import Logo from './ui/Logo.vue'
    import Button from './ui/Button.vue'
    import { getAuth, signOut } from 'firebase/auth'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const auth = getAuth()

    const logout = async () => {
        await signOut(auth)
        router.push('/login')
    }
</script>

<style scoped>
    .header {
        background-color: #355B3E;
        color: #fff;
        padding: 20px 0;
    }
    .header__wrap {
        display: flex;
        gap: 20px;
        justify-content: space-between;
    }
    .header .btn {
        width: fit-content;
        color: #fff;
    }
</style>
