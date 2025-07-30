<template>
  <div class="card">
    <div class="card__img">
      <img :src="park.images[0]?.url" alt="" />
    </div>
    <div class="card__info">
      <h2 class="card__title">{{ park.name }}</h2>
      <p class="card__text">{{ park.description }}</p>
      <p class="card__link">View details →</p>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    park: Object
  })
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    background-color: #F5DBC4;
    border-radius: 24px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    cursor: pointer;
  }
  .card:hover {
    box-shadow: 0px 20px 20px -10px rgba(34, 58, 40,0.6);
  }
  .card__img {
    width: 100%;
    aspect-ratio: 245 / 180;
    border-radius: 16px;
    overflow: hidden;
  }
  .card__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 15px;
  }
  .card__title {
    margin: 0 0 10px;
    font-size: 24px;
    line-height: 140%;
    font-weight: 700;
    flex: 1;
     transition: color 0.3s ease;
  }
  .card:hover .card__title {
    color: #65CDD5;
  }
  .card__text  {
    font-size: 14px;
    line-height: 130%;
    margin-bottom: 40px;
    display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .card__link {
    font-style: italic;
    font-size: 18px;
    line-height: 130%;
    transition: color 0.3s ease;
  }
  .card:hover .card__link {
    color: #65CDD5;
  }

</style>