<template>
    <div class="container">
      <header class="header">
            <div class="bg-[#ccc]">
            <h1 class="text-black">Manga Guesser</h1>
            </div>
        </header>
        <br>
        <div v-if="titles" class="character-container">
            <img :src="images" class="character-image"/>
        </div>
        <p v-else>Cargando mangas...</p>
        <div class="input-container">
          <input
            v-model="userGuess"
            placeholder="Escribe el nombre..."
            @input="showSuggestions = true"
            @keyup.enter="checkGuess"
          />
          <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions bg-[#e9e9e9] z-10 border-1 border-[#ddd]">
              <li v-for="(name, index) in filteredSuggestions" :key="index" @click="selectSuggestion(name)" class="text-black">
                {{ name }}
              </li>
            </ul>
        </div>
        <br>
        <button @click="checkGuess" class="bg-[#ccc] text-black">Adivinar</button>
        <p :class="{ correct: message.includes('Correcto'), incorrect: message.includes('Incorrecto') }">
          {{ message }}
        </p>
    </div>
</template>

    <script setup>
    import { ref, onMounted, computed } from "vue";
    import "@/assets/guesser.css";

    const apiUrl = "https://api.jikan.moe/v4/random/manga";
    const images = ref("");
    const title = ref("");
    var titles = [""];
    var genres = [];

    const userGuess = ref("");
    const message = ref("");
    const showSuggestions = ref(false);

    async function fetchRandomManga() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        title.value = data.data.title;
        data.data.genres.map((genero) => genres.push(genero.name));
        filter(data);

        message.value = "";
        userGuess.value = "";
        titles.push(title.value);
        console.log(genres);
        fetchMangas()
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    }

    function filter (data) {
      if (genres.includes("Hentai") || genres.includes("Erotica") || genres.includes("Boys Love") || genres.includes("Ecchi")){
        console.log(genres)
        genres = [];
        fetchRandomManga();
        return;
      } else {
        images.value = data.data.images.jpg.large_image_url;
      }
    }

    async function fetchMangas () {
      for (let i = 0; i < 30; i++) {
        const response = await fetch(apiUrl);
        const data = await response.json();
        titles.push(data.data.title);
      }
      console.log(titles);
    }

    function checkGuess() {
      if (!title.value) return;
      const correctName = title.value.toLowerCase();
      if (userGuess.value.toLowerCase() === correctName) {
        message.value = "¡Correcto! 🎉";
        titles = [];
        setTimeout(fetchRandomManga, 2000);
      } else {
        message.value = "Incorrecto, intenta otra vez. ❌";
      }
      showSuggestions.value = false;
    }

    const filteredSuggestions = computed(() => {
      if (!userGuess.value) return [];
      return titles
        .filter((name) => name.toLowerCase().includes(userGuess.value.toLowerCase()))
        .slice(0, 5);
    });

    function selectSuggestion(name) {
      userGuess.value = name;
      showSuggestions.value = false;
    }

    onMounted(fetchRandomManga);
    </script>

    <style scoped>

    </style>
