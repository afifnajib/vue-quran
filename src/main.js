import { createApp } from 'vue'
import App from './App.vue'
// import App from './views/E-Quran.vue'
import router from './router'
import axios from "axios"
import './assets/style.css'
import Vue3SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';

const app = createApp(App)

const axiosInstance = axios.create({
  // withCredentials: true,
  // baseURL: 'https://api.alquran.cloud/v1'
  baseURL: 'https://api.quran.com/api/v4'
})

app.use(router, axios)
app.component('Vue3SimpleTypeahead', Vue3SimpleTypeahead)
app.mount('#app')
app.config.globalProperties.$axios = { ...axiosInstance }


// https://stackblitz.com/edit/vue3-compat-axios-global-prop?file=src%2FApp.vue