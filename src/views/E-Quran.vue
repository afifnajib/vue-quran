<template>
<top-nav />
<side-nav class="smc:hidden md:block" />
<div class="p-4 md:ml-32">
   <div class="w-full p-5 rounded overflow-hidden">
      <vue3-simple-typeahead
         id="typeahead_id"
         placeholder="Start writing..."
         :items="searchName"
         :minInputLength="1"
         :itemProjection="itemProjectionFunction"
         :selectOnTab = true
         @submit="(e) => {
            // console.log('test')
         }"
      ></vue3-simple-typeahead>
      <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 smc:pb-16 md:pb-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         <div class="bg-color-2 cursor-pointer shadow-md rounded-lg px-4 py-6 text-center hover:bg-slate-500 hover:transition hover:duration-300 hover:delay-150" v-for="surah in quran" :key="surah.id">
            <div @click="doLink(surah.number)">
               <span class="bg-color-3 w-15 relative bottom-2 sm:mr-[90%] text-color-2 text-md font-medium px-2.5 py-0.5 rounded-full">{{ surah.revelationType }}</span>
               <dt class="text-2xl font-medium text-color-4 font-arab">{{ surah.name }}</dt>
               <dt class="text-lg font-medium text-color-4 font-serif">{{ surah.englishName }} ({{ surah.numberOfAyahs }} Ayat)</dt>
               <dd class="mt-1 text-md text-color-3">{{ surah.englishNameTranslation }}</dd>
            </div>
         </div>
      </dl>
   </div>
</div>
<bottom-nav class="md:hidden sm:block" />
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap');
.font-arabic {
  font-family: 'Noto Naskh Arabic', serif;
}
@font-face {
  font-family: "Kitab";
  src: local("Kitab"),
   url(../assets/font/Kitab-Regular.ttf) format("truetype");
}
.font-arab {
   font-family: "kitab";
}
</style>
<script>
import BottomNav from "../components/BottomNav.vue"
import TopNav from "../components/TopNav.vue"
import SideNav from "../components/SideNav.vue"
export default {
   props: {
      items: {
         type: Array,
         required: true,
      }
   },
   name: 'E-Quran',
   components: {
      BottomNav, 
      TopNav, 
      SideNav,
   },
  data() {
    return {
      quran: [],
      route: null,
      searchName: [],
      filter: {
        quran_id:
          typeof this.$route.query.model !== "undefined"
            ? this.$route.query.model_cloth_id
            : null,
      },
    }
  },
  async mounted() {
    const resp = await this.$axios.get('/surah')
    .then(resp => {
      this.quran = resp.data.data
      // console.log(this.limit ? this.quran.slice(0,this.limit) : this.quran);
    })
    .catch(e => {
      console.log(e);
    });
    this.getItem()
  },
  methods: {
   doLink(surah){
      for (let i = 0; i < this.quran.length; i++) {
         this.quran[i].number = surah;
      }
      this.$router.push('/e-quran/'+ surah)
      this.route = this.$router.push('/e-quran/'+ surah)
   },
   getItem() {
      this.searchName = this.quran.map((e) => {
         // return {value: e.number, text: e.englishName}
         return e.englishName
      })
      console.log(this.$route.query)
      // var test =this.searchName.map((d) => {
      //    return d
      // })
   }
  }
}
</script>