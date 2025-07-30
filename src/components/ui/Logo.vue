<template>
  <div class="logo">
    <div class="logo__icon">
      <inline-svg :src="logoImg" />
    </div>
    <div class="logo__text">Travalizer</div>
  </div>
</template>

<script setup>
    const logoImg = new URL('@/assets/svg/logo.svg', import.meta.url).href
</script>

<style scoped>
    .logo {
        display: flex;
        gap: 16px;
        align-items: center;
    }

    .logo__icon {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
    }

    .logo svg{
        width: 100%;
        height: 100%;
    }

    .logo__text {
        font-weight: 600;
        font-size: 32px;
        line-height: 100%;
    }

    @media(max-width: 539px) {
        .logo {
            gap: 8px;
        }
        .logo__icon {
            width: 36px;
            height: 36px;
        }
        .logo__text {
            font-size: 24px;
        }
    }
</style>