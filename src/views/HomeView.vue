<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <div class="text-center shadow-sm card m-5 p-5">
      <router-link :to="{ name: 'E - Quran'}" class="text-color-3 hover:text-color-4">E- Qur'an Lite</router-link>
    </div>
  </main>
</template>
