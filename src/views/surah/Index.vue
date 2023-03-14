<template>
    <main>
      <top-nav />
      <side-nav class="smc:hidden md:block" />
      <div class="p-4 md:ml-64 md:mr-32">
        <div class="w-full p-5 rounded overflow-hidden">
          <dl class="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-1 smc:pb-16 md:pb-0 xls:grid-cols-2 xl:grid-cols-3">
              <div class="cursor-pointer border-solid border-2 border-color-a-1 rounded-lg px-2 py-4 text-center" v-for="chapter in chapters" :key="chapter.id">
                  <div @click="doLink(chapter.id)">
                    <span class="bg-color-a-2 w-15 relative bottom-2 sm:mr-[90%] lg:mr-[80%] text-color-a-4 font-bold text-xs px-2.5 py-0.5 rounded-full">{{ chapter.revelation_place }}</span>
                    <dt class="flex smc:text-base lg:text-lg antialiased text-color-4 font-serif">
                      <div id="shape" class="bg-color-a-2 smc:ml-3 sm:ml-6 mt-2 flex origin-center rotate-45 w-10 h-10 rounded-md items-center justify-items-center">
                        <span class="text-color-a-4 rotate-[320deg] ml-3">{{ chapter.number_latin }}</span>
                      </div>
                      <div class="flex-1 text-left smc:ml-4 sm:ml-8">
                        <h3 class="text-md font-bold">{{ chapter.name_complex }}</h3>
                        <i class="text-sm text-color-a-2">{{ chapter.translated_name.name }}</i>
                      </div>
                      <span class="flex-1 sm:ml-12">
                        <h3 class="text-2xl font-arab-bold">{{ chapter.name_arabic }}</h3>
                        <span class="text-sm">{{ chapter.verses_count }} Ayat</span>
                      </span>
                    </dt>
                  </div>
              </div>
            </dl>
        </div>
      </div>
    <bottom-nav class="md:hidden sm:block" />
    </main>
  </template>
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic&display=swap');
  .font-arabic {
    font-family: 'Noto Naskh Arabic', serif;
  }
  @font-face {
    font-family: "Kitab";
    src: local("Kitab"),
     url(../../assets/font/Kitab-Regular.ttf) format("truetype");
  }
  .font-arab {
     font-family: "kitab";
  }
  
  @font-face {
    font-family: "Kitab Bold";
    src: local("Kitab Bold"),
     url(../../assets/font/Kitab-Bold.ttf) format("truetype");
  }
  .font-arab-bold {
     font-family: "kitab bold";
  }
  </style>
  <script>
  import BottomNav from "../../components/BottomNav.vue"
  import TopNav from "../../components/TopNav.vue"
  import SideNav from "../../components/SideNav.vue"
  export default {
     props: {
     },
     name: 'Surah',
     components: {
        BottomNav, 
        TopNav, 
        SideNav,
     },
    data() {
      return {
        chapters: [],
      }
    },
    async mounted() {
      const resp = await this.$axios.get('/chapters?language=id')
      .then(resp => {
        this.chapters = resp.data.chapters
        this.chapters.forEach((data, index) => {
          String.prototype.EntoAr= function(){
            var id= ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
            return this.replace(/[0-9]/g, function(w){
              return id[+w] 
            });
          }
          var S = this.chapters[index].id
          var N = S.toString()
          Object.assign(this.chapters[index], { number_latin: N.EntoAr() })
        })
      })
      .catch(e => {
        console.log(e);
      });
    },
    methods: {
        doLink(id){
            for (let i = 0; i < this.chapters.length; i++) {
                this.chapters[i].id = id;
            }
            this.$router.push('/surah/'+ id)
            // this.route = this.$router.push('/e-quran/'+ surah)
        },
    }
  }
  </script>