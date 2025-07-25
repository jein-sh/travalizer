import { createApp } from 'vue'
import './style.css'
import 'leaflet/dist/leaflet.css'
import App from './App.vue'
import router from './router'
import InlineSvg from 'vue-inline-svg'
import './firebase'

const app = createApp(App)
app.component('inline-svg', InlineSvg)

app.use(router).mount('#app')