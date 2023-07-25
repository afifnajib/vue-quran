<template>
  <div v-if="!isLoading">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol
          role="list"
          class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <div class="flex items-center">
              <a href="#" class="mr-2 text-sm font-medium text-gray-900"
                >Surah</a
              >
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                class="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>

          <li class="text-sm">
            <a
              href="#"
              aria-current="page"
              class="font-medium text-gray-500 hover:text-gray-600"
              >{{ surahInfo.name_complex }}</a
            >
          </li>
        </ol>
      </nav>

      <!-- Product info -->
      <div
        class="shadow-lg mx-auto max-w-2xl px-6 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16"
      >
        <div class="lg:col-span-2 lg:border-gray-200 lg:pr-8">
          <h1
            class="antialiased text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl font-arab-bold"
          >
            {{ surahInfo.name_complex }} -
            {{ surahInfo.name_arabic }}
          </h1>
        </div>

        <div
          class="py-10 px-2 lg:col-span-2 lg:col-start-1 lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6"
        >
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6">
              <p
                class="text-md text-gray-900 text-justify font-custom"
                v-html="setDetailSurah.short_text"
              ></p>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="text-md font-medium font-arab-bold text-gray-900">
              Details
            </h2>

            <div class="mt-4 space-y-6">
              <p
                class="text-md text-gray-600 text-justify font-custom"
                v-html="setDetailSurah.text"
              ></p>
            </div>
            <nav
              class="fixed left-0 bottom-0 w-full bg-white shadow-inner border-t rounded-t-sm border-custom-color-4"
            >
              <div class="m-3">
                <button
                  @click="LinktoRead(setDetailSurah.chapter_id)"
                  class="flex w-full items-center justify-center rounded-md border border-transparent bg-custom-color-1 px-8 py-3 text-base font-medium text-white hover:bg-custom-color-2 focus:outline-none focus:ring-2 focus:ring-custom-color-3 focus:ring-offset-2"
                >
                  Baca Sekarang
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  <template v-else>
    <LoadingVue />
  </template>
</template>
<script>
import LoadingVue from "../../components/Loading.vue";

export default {
  props: {},
  name: "Surah Detail",
  components: {
    LoadingVue,
  },
  data() {
    return {
      paramsId: this.$route.params.id,
      setDetailSurah: [],
      surahInfo: [],
      isLoading: true,
      responseData: "",
    };
  },
  mounted() {
    this.getDetailSurah();
  },
  methods: {
    async getSurahId() {
      this.isLoading;
      await this.$axios
        .get("/chapters/" + this.paramsId + "?language=id")
        .then((resp) => {
          this.surahInfo = resp.data.chapter;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getDetailSurah() {
      this.getSurahId();
      await this.$axios
        .get("/chapters/" + this.paramsId + "/info?language=id")
        .then((resp) => {
          this.setDetailSurah = resp.data.chapter_info;
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    LinktoRead(id) {
      this.$router.push("/surah/read/" + id);
    },
  },
};
</script>
