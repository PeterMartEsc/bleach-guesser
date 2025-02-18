<template>
    <div class="container">
        <header class="header">
            <div class="bg-[#ccc]">
                <h1 class="text-black">Anime Guesser</h1>
            </div>
            <nav>
                <RouterLink to="/">Home</RouterLink><br>
                <RouterLink to="/anime">Adivina el anime</RouterLink><br>
                <RouterLink to="/manga">Adivina el manga</RouterLink><br>
                <RouterLink to="/character">Adivina el personaje</RouterLink>
        </nav>
    </header>
    <br>
    <div v-if="titles" class="character-container">
        <img :src="images" class="character-image"/>
        <p class="text-white">{{ titles }} </p>
        </div>
        <p v-else>Cargando</p>
      </div>
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
