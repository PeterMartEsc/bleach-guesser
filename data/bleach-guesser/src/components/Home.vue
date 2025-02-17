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
        <p style="color: white;">{{ titles }} </p>
        </div>
        <p v-else>Cargando personajes...</p>
      </div>
    </template>
  
    <script setup>
    import { ref, onMounted, computed } from "vue";
    import "@/assets/guesser.css";
  
    const apiUrl = "https://api.jikan.moe/v4/anime/";
    const characters = ref([]);
    const images = ref("");
    const titles = ref("");
    const currentCharacter = ref(null);
    const userGuess = ref("");
    const message = ref("");
    const showSuggestions = ref(false);
  
    async function fetchCharacters() {
      try {
        const randomIndex = Math.floor(Math.random() * 2000);
        const newUrl = apiUrl + randomIndex;
        const response = await fetch(newUrl);
        const data = await response.json();
        titles.value = data.data.title;
        images.value = data.data.images.jpg.large_image_url;
        console.log(titles)
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    }
  
    function pickRandomCharacter() {
      if (characters.value.length > 0) {
        const randomIndex = Math.floor(Math.random() * characters.value.length);
        currentCharacter.value = characters.value[randomIndex];
        message.value = "";
        userGuess.value = "";
      }
    }
  
    function checkGuess() {
      if (!currentCharacter.value) return;
      const correctName = currentCharacter.value.character.name.toLowerCase();
      if (userGuess.value.toLowerCase() === correctName) {
        message.value = "¡Correcto! 🎉";
        setTimeout(pickRandomCharacter, 2000);
      } else {
        message.value = "Incorrecto, intenta otra vez. ❌";
      }
      showSuggestions.value = false;
    }
  
    const filteredSuggestions = computed(() => {
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
  
    onMounted(fetchCharacters);
    </script>
  
    <style scoped>
  
    </style>
  