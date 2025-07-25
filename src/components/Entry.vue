<template>
    <main class="bg-green">
      <div class="container">
        <div class="entry">
          <Logo />
            <div class="entry__image">
                <img src="/img/travel.svg" alt="">
            </div>
            <div class="entry__intro">
                <h1 class="entry__title">Artificial Intelligence giving you travel recommendations</h1>
                <slot />
            </div>
        </div>
      </div>
    </main>
</template>

<script setup>
  import Logo from '../components/ui/Logo.vue'
</script>

<style scoped>

.entry {
  margin: 100px auto;
  background: #FFFFFF;
  border-radius: 24px;
  overflow: hidden;
  width: 100%;
  max-width: 1296px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas: "logo image"
  "intro image";
  box-shadow: 0px 72px 80px -48px #223A28;
}

.entry .logo {
  grid-area: logo;
  padding: 40px 64px 56px;
}

.entry__image {
  grid-area: image;
  background-color: #F5DBC4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
}

.entry__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 500px;
}

.entry__intro {
  grid-area: intro;
  padding: 0 64px 66px;
}

.entry__title {
  font-weight: 600;
  font-size: 24px;
  line-height: 150%;
  margin: 0 0 16px;
}

@media(max-width: 1199px) {
  .entry {
    grid-template-columns: 3fr 2fr;
  }
}

@media(max-width: 956px) {
  .entry .logo {
    padding: 30px 44px;
  }

  .entry__image {
    padding: 30px;
  }

  .entry__intro {
    padding: 0 44px 54px;
  }
}

@media(max-width: 767px) {
  .entry {
    margin: 0 -15px;
    background: #FFFFFF;
    border-radius: 0;
    overflow: hidden;
    width: calc(100% + 30px);
    grid-template-columns: 1fr;
    grid-template-areas: "logo"
    "image"
    "intro";
    box-shadow: none;
  }

  .entry .logo {
    padding: 32px;
    justify-content: center;
    color: #fff;
    background-color: #355B3E;
  }

  .entry__image {
    height: 220px;
  }

  .entry__intro {
    padding: 32px 24px;
  }

  .entry__title {
    font-size: 20px;
  }
}

</style>