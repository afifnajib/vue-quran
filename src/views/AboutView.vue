<script>
import axios from "axios"
export default {
  name: "about",
  data() {
    return {
      quran: [],
    }
  },
  async mounted() {
    const resp = await this.$axios.get('/surah')
    .then(resp => {
      this.quran = resp.data.data
      console.log(resp.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
}
</script>
<template>
  <div class="about">
    <v-alert>asd</v-alert>
    <ul>
    <li v-for="quran in quran" :key="quran.number">{{ quran.englishName }}</li>
  </ul>
  </div>
</template>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>