<template>
    <div class="container">
      <header class="header">
            <div class="bg-[#ccc]">
            <h1 class="text-black">Anime Guesser</h1>
            </div>
        </header>
        <br>
        <div v-if="titles" class="character-container">
            <img :src="images" class="character-image"/>
        </div>
        <p v-else>Cargando animes...</p>
        <div class="input-container">
          <input
            v-model="userGuess"
            placeholder="Escribe el nombre..."
            @keyup.enter="checkGuess"
          />
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

    const apiUrl = "https://api.jikan.moe/v4/random/anime";
    const images = ref("");
    const titles = ref("");

    const userGuess = ref("");
    const message = ref("");
    const showSuggestions = ref(false);

    async function fetchRandomAnime() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        titles.value = data.data.title;
        images.value = data.data.images.jpg.large_image_url;

        message.value = "";
        userGuess.value = "";
        console.log(titles.value)
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    }

    function checkGuess() {
      if (!titles.value) return;
      const correctName = titles.value.toLowerCase();
      if (userGuess.value.toLowerCase() === correctName) {
        message.value = "¡Correcto! 🎉";
        setTimeout(fetchRandomAnime, 2000);
      } else {
        message.value = "Incorrecto, intenta otra vez. ❌";
      }
      showSuggestions.value = false;
    }

  /**   const filteredSuggestions = computed(() => {
      if (!userGuess.value) return [];
      return characters.value
        .map((char) => char.character.name)
        .filter((name) => name.toLowerCase().includes(userGuess.value.toLowerCase()))
        .slice(0, 5);
    });

    function selectSuggestion(name) {
      userGuess.value = name;
      showSuggestions.value = false;
    }
  */
    onMounted(fetchRandomAnime);
    </script>

    <style scoped>

    </style>
