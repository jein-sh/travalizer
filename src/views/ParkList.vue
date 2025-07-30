<template>
    <Header />
    <main>
        <div class="container">
          <h1 class="title">Your AI travel assistant has handpicked the top parks to recharge and explore.</h1>
          <div class="subtitle">It’s time to travel smarter — start with these destinations.</div>
          <div v-if="loading">
              <Preloader />
          </div>
          <div v-else class="grid-4 list">
            <Card
              v-for="park in parks"
              :key="park.id"
              :park="park"
              @click="goToDetail(park)"
            />
          </div>
        </div>
    </main>
</template>

<script setup>
  import Header from '../components/Header.vue'
  import { ref, onMounted } from 'vue'
  import Card from '../components/Card.vue'
  import Preloader from '../components/ui/Preloader.vue'
  import { useRouter } from 'vue-router'
  const nspKey = import.meta.env.VITE_NPS_API_KEY

  const parks = ref([])
  const router = useRouter()
  const loading = ref(true)


  const fetchParks = async () => {
    try {
      const res = await fetch('https://parks-cabb0-default-rtdb.europe-west1.firebasedatabase.app/parks.json');
      const data = await res.json();

      const allParks = Object.values(data);
      const shuffled = allParks.sort(() => 0.5 - Math.random());
      parks.value = shuffled.slice(0, 12);

    } catch (error) {
      console.error('Error fetching parks:', error)
    } finally {
      loading.value = false
    }
  }

  const goToDetail = (park) => {
    router.push(`/parks/${park.parkCode}`)
  }

  onMounted(fetchParks)

</script>

<style scored>
  .title {
    color: #047857; 
    text-shadow: 2px 2px 4px #fff;
    font-size: 46px;
    line-height: 130%;
    font-weight: 600;
    text-align: center;
    margin: 24px 0;
    text-wrap: balance;
  }
  .subtitle {
    font-size: 24px;
    line-height: 130%;
    text-align: center;
    margin-bottom: 20px;
    text-wrap: balance;
  }
  .list {
    margin: 50px 0;
  }
  @media(max-width: 767px) {
    .title {
      font-size: 26px;
      margin: 20px 0;
    }
    .subtitle {
      font-size: 16px;
    }
  }


</style>