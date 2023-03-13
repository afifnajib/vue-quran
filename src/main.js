import { createApp } from 'vue'
import App from './App.vue'
// import App from './views/E-Quran.vue'
import router from './router'
import axios from "axios"
import './assets/style.css'

const app = createApp(App)

const axiosInstance = axios.create({
  // withCredentials: true,
  baseURL: 'https://api.alquran.cloud/v1'
})


app.use(router, axios)
app.mount('#app')
app.config.globalProperties.$axios = { ...axiosInstance }


// https://stackblitz.com/edit/vue3-compat-axios-global-prop?file=src%2FApp.vue