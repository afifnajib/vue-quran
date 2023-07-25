<template>
  <main v-if="!isLoading">
    <top-nav />
    <side-nav class="smc:hidden md:block" />
    <div class="p-4 md:ml-64 lg:mr-32">
      <div class="w-full p-5 rounded overflow-hidden">
        <dl
          class="grid grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-1 smc:pb-16 md:pb-0 xls:grid-cols-2 xl:grid-cols-3"
        >
          <div
            class="cursor-pointer border-solid border-2 border-color-a-1 rounded-lg px-2 py-4 text-center"
            v-for="chapter in chapters"
            :key="chapter.id"
          >
            <div @click="doLink(chapter.id)">
              <div class="grid grid-cols-3 gap-4 mb-3">
                <div class=""></div>
                <div class=""></div>
                <div class="">
                  <span
                    class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
                    >{{ chapter.revelation_place }}</span
                  >
                </div>
              </div>
              <!-- <span
                class="bg-color-a-2 w-15 relative bottom-2 sm:mr-[90%] lg:mr-[80%] text-color-a-4 font-bold text-xs px-2.5 py-0.5 rounded-full"
                >{{ chapter.revelation_place }}</span
              > -->
              <dt
                class="flex smc:text-base lg:text-lg antialiased text-color-4 font-serif ml-3 mr-3"
              >
                <div class="flex w-25 mt-[-10px]">
                  <div
                    id="shape"
                    class="bg-color-a-2 mx-3 mt-3 rotate-45 w-10 h-10 flex flex-col justify-items-center"
                  >
                    <div class="mt-[6px] -rotate-45 text-color-1">
                      {{ chapter.number_latin }}
                    </div>
                  </div>
                </div>
                <div class="flex-2 text-left smc:ml-4 sm:ml-6">
                  <h3 class="text-md font-bold">{{ chapter.name_complex }}</h3>
                  <p>
                    <i class="text-sm text-color-a-2">{{
                      chapter.translated_name.name
                    }}</i>
                  </p>
                </div>
                <div class="flex-1 sm:ml-12 text-right">
                  <h3 class="text-2xl font-arab-bold">
                    {{ chapter.name_arabic }}
                  </h3>
                  <span class="text-sm">{{ chapter.verses_count }} Ayat</span>
                </div>
              </dt>
            </div>
          </div>
        </dl>
      </div>
    </div>
    <bottom-nav class="md:hidden sm:block" />
  </main>
  <template v-else>
    <LoadingVue />
  </template>
</template>
<script>
import BottomNav from "../../components/BottomNav.vue";
import TopNav from "../../components/TopNav.vue";
import SideNav from "../../components/SideNav.vue";
import LoadingVue from "../../components/Loading.vue";
export default {
  props: {},
  name: "Surah",
  components: {
    BottomNav,
    TopNav,
    SideNav,
    LoadingVue,
  },
  data() {
    return {
      chapters: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getSurah();
  },
  methods: {
    async getSurah() {
      this.isLoading;
      await this.$axios
        .get("/chapters?language=id")
        .then((resp) => {
          this.chapters = resp.data.chapters;
          this.chapters.forEach((data, index) => {
            String.prototype.EntoAr = function () {
              var id = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
              return this.replace(/[0-9]/g, function (w) {
                return id[+w];
              });
            };
            var S = this.chapters[index].id;
            var N = S.toString();
            Object.assign(this.chapters[index], { number_latin: N.EntoAr() });
            this.isLoading = false;
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    doLink(value) {
      // for (let i = 0; i < this.chapters.length; i++) {
      //   this.chapters[i].id = id;
      // }
      this.$router.push("/surah/" + value);
      // this.route = this.$router.push('/e-quran/'+ surah)
    },
  },
};
</script>
