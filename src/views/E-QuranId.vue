<template>
    <top-nav/>
    <side-nav class="smc:hidden md:block" />
        <div class="p-4 md:ml-52 md:mr-20 xlc:ml-72 xlc:mr-40">
            <div class="grid grid-cols-3 gap-4 bg-color-2 rounded shadow px-8 py-8">
                <div class="sm:text-lg xlc:text-2xl text-slate-700">
                    {{ quran.number }}. {{ quran.englishName }}
                </div>
                <div class="sm:text-lg xlc:text-2xl text-center text-color-3">
                    {{ quran.englishNameTranslation }}
                </div>
                <div class="text-right sm:text-lg xlc:text-2xl font-arab text-slate-700">
                    {{ quran.name }}
                </div>
            </div>
            <div id="container-1" class="grid grid-cols-1 gap-4 px-8 py-8">
                <div class="text-4xl text-right font-arab text-slate-700 sticky" v-for="surah in quran.ayahs" :key="surah.number">
                    <h2 :id="'text-arab-'+ surah.number"><span class="leading-loose">{{ surah.text }} </span><span class="bg-color-3 p-2 text-xl rounded-lg text-color-2">{{ surah.numLatin }}</span></h2>
                    <h3 class="text-left text-2xl m-5">{{ surah.latin }}</h3>
                </div>
            </div>
            <audio v-if="numberAudio" id="sound" preload="metadata" controls class="fixed bottom-0 w-3/4 bg-gray-200 p-4 rounded-lg">
              <source id="source-sound" :src="'https://cdn.islamic.network/quran/audio/128/ar.alafasy/'+ numberAudio + '.mp3'" type="audio/mpeg">
              Your browser does not support the audio element. 
            </audio>
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

@font-face {
  font-family: "Andalus";
  src: local("Andalus"),
   url(../assets/font/Andalus.ttf) format("truetype");
}
.font-latin {
   font-family: "andalus";
}

html, body {
  scroll-behavior: smooth;
}

</style>
<script>
import BottomNav from "../components/BottomNav.vue"
import TopNav from "../components/TopNav.vue"
import SideNav from "../components/SideNav.vue"
import axios from "axios"
export default {
  components: { 
   BottomNav, 
   TopNav, 
   SideNav
   },
  data() {
    return {
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/',
      quran: [],
      label: null,
      currentAudio: null,
      numberAudio: null,
      removeBismillah: null,
    }
  },
  async mounted() {
    const resp = await this.$axios.get('/surah/' + this.$route.params.number)
    const ayat =  await this.$axios.get('/surah/' + this.$route.params.number + '/id.indonesian')

    this.quran = resp.data.data
    this.numberAudio = resp.data.data.ayahs[0].number
    if(this.$route.params.number != 1){
      var bismillah = this.quran.ayahs[0].text
      this.removeBismillah = bismillah.slice(40)
      Object.assign(this.quran.ayahs[0], { text: this.removeBismillah })
    }
    ayat.data.data.ayahs.forEach((data, index) => {
      String.prototype.EntoAr= function(){
        var id= ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
        return this.replace(/[0-9]/g, function(w){
          return id[+w] 
        });
      }
      var S = data.numberInSurah
      var N = S.toString()
      Object.assign(this.quran.ayahs[index], { latin: data.text, numLatin: N.EntoAr() })
    })
    this.numberAudio = this.quran.ayahs[0].number
    setTimeout(() => {
      let audio = document.querySelector('#sound')
      let textAwal = document.querySelector('#text-arab-' + this.numberAudio)
        audio.onended = (e) => {
          let num = this.numberAudio+=1
          // let text = document.querySelector('#text-arab-' + num)
          if(num <= this.quran.ayahs[this.quran.ayahs.length - 1].number){
            audio.src = this.audioUrl + num + '.mp3'
            audio.pause()
            audio.load()
            audio.play()
            let text = document.querySelector('#text-arab-' + this.numberAudio)
            audio.onloadedmetadata = function() {
              // console.log(audio.duration)
            setTimeout(() => {
                text.style.color = 'blue'
                text.style.content = ''
              }, audio.duration)
            }
          }
        }
        setTimeout(() => {
            textAwal.style.color = 'blue'
            textAwal.style.content = ''
            // textAwal.style.zIndex = '5rem'
          }, audio.duration)
    }, 500)
  },
  methods: {
    
  }
}
</script>