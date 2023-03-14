<template>
    <top-nav/>
    <side-nav class="smc:hidden md:block" />
        <div class="md:ml-52 md:mr-20 xlc:ml-72 xlc:mr-40">
            <div class="grid grid-cols-3 gap-4 bg-color-2 rounded shadow px-8 py-8">
                <div class="sm:text-lg xlc:text-2xl text-slate-700">
                    {{ quran.number }}. {{ quran.englishName }}
                </div>
                <div class="sm:text-lg xlc:text-2xl text-center text-color-3">
                    {{ quran.englishNameTranslation }}
                </div>
                <div class="text-right sm:text-lg xlc:text-2xl font-arab-bold text-slate-700">
                    {{ quran.name }}
                </div>
            </div>
            <div id="container-1" class="grid grid-cols-1 gap-4 md:px-8 md:pt-8 md:pb-16 smc:pb-36 smc:px-4 smc:pt-4 divide-y divide-dashed">
                <div class="text-4xl text-right font-arab text-slate-700 sticky" v-for="surah in quran.ayahs" :key="surah.number">
                    <h2 :id="'text-arab-'+ surah.number">
                      <span class="leading-loose smc:mr-0 smc:ml-4 sm:ml-0 md:mr-6 md:ml-4">{{ surah.text }} </span>
                      <span class="border-solid border-2 border-color-3 p-2 text-xl rounded-lg font-bold text-color-4">{{ surah.numLatin }}</span>
                    </h2>
                    <h3 class="ml-4 text-left leading-none smc:text-xl md:text-2xl mt-3">
                      <span>{{ surah.latin }}</span>
                    </h3>
                    <button class="pr-4" @click="audioPlayNumber(surah.number)">
                      <svg fill="#112D4E" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xml:space="preserve" stroke="#112D4E">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                          <g> 
                            <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"></path> 
                            <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path> 
                          </g> 
                        </g>
                      </svg>
                    </button>
                </div>
            </div>
            <audio v-if="numberAudio" id="sound" preload="metadata" class="smc:w-full md:w-[60%] lg:w-3/4 xlc:w-[55%] xl:w-3/4 fixed md:bottom-0 smc:bottom-20" autobuffer controls>
              <source id="source-sound" :src="'https://cdn.islamic.network/quran/audio/128/ar.alafasy/'+ numberAudio + '.mp3'" type="audio/mpeg">
              <div class="flex items-center justify-center h-full absolute inset-0">
                <button class="text-white rounded-full bg-blue-500 p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3l14 9-14 9V3z" />
                  </svg>
                </button>
              </div>
            </audio>
            <!-- <audio v-if="numberAudio" id="sound" preload="metadata" controls class="fixed smc:p-4 smc:bottom-20 md:bottom-0 m-auto w-full bg-gray-200 p-4 rounded-lg">
              <source id="source-sound" :src="'https://cdn.islamic.network/quran/audio/128/ar.alafasy/'+ numberAudio + '.mp3'" type="audio/mpeg">
              Your browser does not support the audio element. 
            </audio> -->
        </div>
    <bottom-nav class="md:hidden sm:block" />
</template>
<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap'); */
/* .font-arabic {
  font-family: 'Noto Naskh Arabic', serif;
} */
@font-face {
  font-family: "Kitab";
  src: local("Kitab"),
   url(../assets/font/Kitab-Regular.ttf) format("truetype");
}
.font-arab {
   font-family: "kitab";
}

@font-face {
  font-family: "Kitab Bold";
  src: local("Kitab Bold"),
   url(../assets/font/Kitab-Bold.ttf) format("truetype");
}
.font-arab-bold {
   font-family: "kitab bold";
}

/* @font-face {
  font-family: "Andalus";
  src: local("Andalus"),
   url(../assets/font/Andalus.ttf) format("truetype");
}
.font-latin {
   font-family: "andalus";
} */

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
      currentAudio: [{
        number:null,
      }],
      numberAudio: null,
      numberAudioFirst: null,
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
    this.numberAudioFirst = this.quran.ayahs[0].number
    setTimeout(() => {
      let audio = document.querySelector('#sound')
      let textAwal = document.querySelector('#text-arab-' + this.numberAudioFirst)
        audio.onended = (e) => {
          if(this.currentAudio.number == null){
            let num = this.numberAudio+=1
            if(num <= this.quran.ayahs[this.quran.ayahs.length - 1].number){
              audio.src = this.audioUrl + num + '.mp3'
              audio.pause()
              audio.load()
              audio.play()
              let text = document.querySelector('#text-arab-' + this.numberAudio)
              audio.onloadedmetadata = function() {
              setTimeout(() => {
                  text.style.color = '#3F72AF'
                  text.style.content = ''
                }, audio.duration)
              }
            }
          }else {
            let num = this.currentAudio.number+=1
            if(num <= this.quran.ayahs[this.quran.ayahs.length - 1].number){
              audio.src = this.audioUrl + num + '.mp3'
              audio.pause()
              audio.load()
              audio.play()
              let text = document.querySelector('#text-arab-' + this.currentAudio.number)
              audio.onloadedmetadata = function() {
              setTimeout(() => {
                  text.style.color = '#112D4E'
                  text.style.content = ''
                }, audio.duration)
              }
            }
          }
        }
        setTimeout(() => {
          textAwal.style.color = '#3F72AF'
          textAwal.style.content = ''
        }, audio.duration)
    }, 500)
  },
  methods: {
    audioPlayNumber(currentAudio){
      this.currentAudio = this.quran.ayahs
      for (let i = 0; i < this.currentAudio.length; i++) {
        const currentAudio = this.currentAudio[i].number;
      }
      this.currentAudio.number = currentAudio

      setTimeout(() => {
      let audio = document.querySelector('#sound')
            audio.src = this.audioUrl + this.currentAudio.number + '.mp3'
            audio.pause()
            audio.load()
            audio.play()

            // let text = document.querySelector('#text-arab-' + this.numberAudio)
          //   audio.onloadedmetadata = function() {
          //   setTimeout(() => {
          //       text.style.color = '#3F72AF'
          //       text.style.content = ''
          //     }, audio.duration)
          // }
          
        // setTimeout(() => {
        //   textAwal.style.color = '#3F72AF'
        //   textAwal.style.content = ''
        // }, audio.duration)
    }, 500)
    }
  }
}
</script>