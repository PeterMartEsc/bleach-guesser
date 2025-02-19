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
  <br>

  <section class=" w-full">
    <div v-if="titles" class="w-full pt-[20px]">
      <div class="w-2xl h-[500px] justify-self-center">
        <img :src="images" class="justify-self-center object-cover min-h-full border-2 p-2 max-w-full max-h-full"/>
      </div>

      <div class="justify-self-center pt-4">
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
        <br>
        <button @click="checkGuess" class="bg-[#ccc] text-black">Adivinar</button>
        <p :class="{ correct: message.includes('Correcto'), incorrect: message.includes('Incorrecto') }">
          {{ message }}
        </p>
      </div>
    </div>
    <p v-else>Cargando mangas...</p>
  </section>
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
        titles = [];
        titles.push(title.value);
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
        .filter((name) => name.toLowerCase().startsWith(userGuess.value.toLowerCase()))
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
