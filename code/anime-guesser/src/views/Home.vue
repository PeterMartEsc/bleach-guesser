<template>
  <section class="fixed top-0 left-0 bg-gray-400 w-full p-4 z-10">
    <div class="mb-10">
      <h1 class="text-black text-3xl font-serif font-bold text-center">Anime Guesser</h1>
    </div>

    <!-- Router nav -->
    <nav class="flex space-x-4 justify-between mt-5 font-serif">
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

  <section class="w-full">
    <!-- Contenedor de imagen centrado -->
    <div v-if="titles" class="w-full pt-[20px]">
      <div class="w-2xl h-[500px] justify-self-center">
        <img :src="images" class="justify-self-center object-cover min-h-full border-2 p-2 max-w-full max-h-full"/>
      </div>
      <p class="text-black text-center mt-4">{{ titles }}</p>
    </div>
    <p v-else>Cargando...</p>
  </section>

</template>

<script setup>
  /**
   * Componente Home con el router
   * @name Home
   * @description Este componente muestra un anime random y sirve como home de la aplicación
   */
  import { ref, onMounted, computed } from "vue";
  import "@/assets/guesser.css";

  const apiUrl = "https://api.jikan.moe/v4/random/anime";
  const images = ref("");
  const titles = ref("");
  var genres = [];
  /**
   * Función que obtiene un anime random de la api de MyAnimeList
   * @method fetchRandomAnime
   */

  async function fetchRandomAnime() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      titles.value = data.data.title;
      images.value = data.data.images.jpg.large_image_url;
      data.data.genres.map((genero) => genres.push(genero.name));
      filter(data);
      console.log(titles.value)
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  }

  function filter (data) {
      if (genres.includes("Hentai") || genres.includes("Erotica") || genres.includes("Boys Love") || genres.includes("Ecchi")){
        console.log(genres)
        genres = [];
        fetchRandomAnime();
        return;
      } else {
        images.value = data.data.images.jpg.large_image_url;
      }
    }

  onMounted(fetchRandomAnime);
</script>

<style scoped>

</style>
