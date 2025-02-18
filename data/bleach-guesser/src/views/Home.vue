<template>
  <section class="header fixed top-0 left-0 bg-gray-400 w-full p-4 z-10">
    <div class="mb-10">
      <h1 class="text-black text-3xl font-serif font-bold text-center">Anime Guesser</h1>
    </div>

    <nav class="flex space-x-4 justify-center">
      <RouterLink to="/">
        <p class="text-blue-800">Home</p>
      </RouterLink>
      <RouterLink to="/anime">
        <p class="text-blue-800">Adivina el anime</p>
      </RouterLink>
      <RouterLink to="/manga">
        <p class="text-blue-800">Adivina el manga</p>
      </RouterLink>
      <RouterLink to="/character">
        <p class="text-blue-800">Adivina el personaje</p>
      </RouterLink>
    </nav>
  </section>

  <section class="flex-col pt-50">
    <!-- Contenedor de imagen centrado -->
    <div v-if="titles" class=" bg-blue-800">
      <img :src="images" class="justify-self-center"/>
      <p class="text-white text-center mt-4">{{ titles }}</p>
    </div>
    <p v-else>Cargando...</p>
  </section>

</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import "@/assets/guesser.css";

  const apiUrl = "https://api.jikan.moe/v4/random/anime";
  const images = ref("");
  const titles = ref("");

  async function fetchRandomAnime() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      titles.value = data.data.title;
      images.value = data.data.images.jpg.large_image_url;
      console.log(titles.value)
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }

  onMounted(fetchRandomAnime);
</script>

<style scoped>

</style>
