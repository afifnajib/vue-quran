<template>
  <div class="shadow p-5 font-custom" v-if="!isLoading">
    <div v-for="(read, index) in setRead.verses" :key="read.id">
      <div v-for="(translate, idx) in setTranslation.translations" :key="idx">
        <template v-if="idx === index">
          <div class="mx-3 my-4">
            <h3 class="font-arab-bold text-2xl text-right">
              {{ read.text_uthmani }}
            </h3>
            <h4 class="text-justify text-lg" v-html="translate.text"></h4>
          </div>
        </template>
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
  components: { LoadingVue },
  data() {
    return {
      paramsId: this.$route.params.id,
      isLoading: true,
      setRead: [],
      setTranslation: [],
    };
  },
  mounted() {
    this.readDataSurah();
  },
  methods: {
    async readDataTranslation() {
      await this.$axios
        .get("/quran/translations/134?chapter_number=" + this.paramsId)
        .then((res) => {
          this.setTranslation = res.data;
        });
    },
    async readDataSurah() {
      this.isLoading;
      await this.readDataTranslation();
      await this.$axios
        .get("/quran/verses/uthmani?chapter_number=" + this.paramsId)
        .then((result) => {
          this.setRead = result.data;
          this.isLoading = false;
        });
    },
  },
};
</script>
