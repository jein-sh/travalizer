<template>
    <Header />
    <main>
        <div class="container">
          <h1 class="title">Your AI travel assistant has handpicked the top parks to recharge and explore.</h1>
          <div class="subtitle">It’s time to travel smarter — start with these destinations.</div>
          <div class="grid-4 list">
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
  import { useRouter } from 'vue-router'
  const nspKey = import.meta.env.VITE_NPS_API_KEY

  const parks = ref([])
  const router = useRouter()

  const fetchParks = async () => {
  const total = 500; 
  const pageSize = 12;
  const randomStart = Math.floor(Math.random() * (total - pageSize));

  const res = await fetch(
    `https://developer.nps.gov/api/v1/parks?limit=100&start=${randomStart}&api_key=${nspKey}`
  )
  const data = await res.json()
  const shuffled = data.data.sort(() => 0.5 - Math.random());

  parks.value = shuffled.slice(0, 12)
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


</style>