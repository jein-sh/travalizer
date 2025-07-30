<template>
  <div class="preloader">
    <img src="/img/loader.gif" alt="Loading..." />
    <p class="preloader__text">Loading ...</p>
  </div>
</template>

<style scoped>
.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.preloader img {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}
</style>