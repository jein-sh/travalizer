<template>
    <Header />
      <div v-if="loading">
        <Preloader />
    </div>
    <main class="park" v-else v-if="park">
      <div class="park__hero">
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          navigation
          loop
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          class="park__slider"
        >
          <SwiperSlide
            v-for="(img, index) in park.images"
            :key="index"
          >
            <img
              :src="img.url"
              :alt="img.altText || 'Фото парка'"
            />
          </SwiperSlide>
        </Swiper>
        <h1 class="park__name">{{ park.fullName }}</h1>
      </div>
      <div class="container">
        <Button text="← Back" mod="bordered" @click="goBack" />
        <div class="park__tags">
          <div v-if="park.designation" class="park__tag">{{ park.designation }}</div>  
          <div v-if="park.states" class="park__tag">State: {{ park.states }}</div>
        </div>
        <div class="park__description">{{ park.description }}</div>
        <div class="park__wrap">
          <div class="park__info">
            <h2 class="park__title">Contacts</h2>
            <dl class="park__list">
              <dt v-if="address">Address:</dt>
              <dd v-if="address">
                  {{ address.line1 }}<br />
                  {{ address.city }}, {{ address.stateCode }} {{ address.postalCode }}
              </dd>
              <dt v-if="phone">Phone:</dt>
              <dd v-if="phone">
                <a :href="`tel:+1${phone.replace(/\D/g, '')}`">{{ formatPhone(phone) }}</a>
              </dd>
              <dt v-if="email">Email:</dt>
              <dd v-if="email">
                <a :href="`mailto:${email}`">{{ email }}</a>
              </dd>
              <dt v-if="park.url">Site:</dt>
              <dd v-if="park.url">
                <a :href="park.url">{{ park.url }}</a>
              </dd>
            </dl>
          </div>
          <div class="park__info">
            <h2 class="park__title">How to get there</h2>
            <div class="park__text">{{ park.directionsInfo }}</div>
          </div>
          <div class="park__info">
            <h2 class="park__title">Weather</h2>
            <div class="park__text">{{ park.weatherInfo }}</div>
          </div>
        </div>
      </div>
     <div id="map" class="park__map"></div>
    </main>
</template>

<script setup>
  import Header from '../components/Header.vue'
  import Button from '../components/ui/Button.vue'
  import { ref, onMounted, computed, nextTick } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import L from 'leaflet'
  import 'swiper/css'
  import 'swiper/css/navigation'
  import 'swiper/css/autoplay'
  import { Navigation, Autoplay } from 'swiper/modules'
  import Preloader from '../components/ui/Preloader.vue'


  const route = useRoute()
  const router = useRouter()
  const park = ref(null)
  const loading = ref(true)

  const nspKey = import.meta.env.VITE_NPS_API_KEY

  const fetchPark = async () => {
    try {
      const res = await fetch(`https://developer.nps.gov/api/v1/parks?parkCode=${route.params.code}&api_key=${nspKey}`)
      const data = await res.json()
      park.value = data.data[0]

      await nextTick() 
      const lat = parseFloat(park.value.latitude)
      const lng = parseFloat(park.value.longitude)

      const map = L.map('map').setView([lat, lng], 10)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      L.marker([lat, lng]).addTo(map)
    } catch (error) {
      console.error('Error fetching park:', error)
    } finally {
      loading.value = false
    }
  }

  const goBack = () => {
    router.back()
  }

  const formatPhone = (raw) => {
    if (!raw) return ''

    const digits = raw.replace(/\D/g, '')

    if (digits.length === 11 && digits.startsWith('1')) {
      return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    } else if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    }
 
    return raw 
  }

  onMounted(fetchPark)

  const modules = [Navigation, Autoplay]
  const address = computed(() => park.value?.addresses?.[0])
  const phone = computed(() => park.value?.contacts?.phoneNumbers?.[0]?.phoneNumber)
  const email = computed(() => park.value?.contacts?.emailAddresses?.[0]?.emailAddress)
</script>

<style scoped>
  .park__hero {
    position: relative;
    height: 80vh;
    margin-bottom: 30px;
  }
  .park__slider {
    height: 100%;
  }
  .park__slider img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .park__name {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 5;
    background: rgba(53, 91, 62, .3);
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 54px;
    line-height: 130%;
    padding: 24px;
    margin: 0;
    text-align: center;
    text-wrap: balance;
  }
  .park .btn {
    width: fit-content;
    margin-bottom: 20px;
  }
  .park__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 0 20px 40px;
  }
  .park__tag {
    padding: 10px 20px;
    border-radius: 16px;
    background-color: #FDC858;
    font-size: 12px;
    font-weight: 700;
    line-height: 130%;
    box-shadow: 0px 5px 5px -5px rgba(34, 58, 40,0.6);
    flex-shrink: 0;
  }
  .park__description {
    font-size: 20px;
    line-height: 130%;
    text-indent: 40px;
    margin: 0 0 20px ;
  }
  .park__wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-bottom: 20px;
  }
  .park__info {
    display: flex;
    flex-direction: column;
    background-color: #F5DBC4;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
    padding: 30px;
    max-width: 400px;
    box-shadow: 0px 20px 20px -10px rgba(34, 58, 40,0.6);
  }
  .park__title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 15px;
  }
  .park__list {
    margin: 0;
  }
  .park__list dt {
    font-style: italic;
    font-weight: 500;
    opacity: 0.6;
  }
  .park__list a {
    word-wrap: break-word;
  }
  .park__list a:hover {
    color: #65CDD5;
  }

  .park__map {
    height: 400px;
  }

  @media(max-width: 767px) {
    .park__name {
      font-size: 40px;
      padding: 15px;
    }
    .park__tags {
      margin: 0 0 15px 0;
    }
    .park__title {
      font-size: 20px;
    }
  }
  @media(max-width: 539px) {
    .park__name {
      font-size: 32px;
    }
    .park__description {
      font-size: 18px;
      text-indent: 20px;
    }
  }
</style>