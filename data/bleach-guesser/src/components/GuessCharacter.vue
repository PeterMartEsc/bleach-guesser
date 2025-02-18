<template>
    <div class="container">
      <header class="header">
        <div class="bg-[#ccc]">
          <h1 class="text-black">Character Guesser</h1>
        </div>
      </header>
      <br>
        <h1>🔍 Adivina el Personaje</h1>
        <div v-if="characterName" class="character-container">
          <img :src="characterImage" alt="Personaje" class="character-image"/>
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
          <button @click="checkGuess" class="bg-[#ccc] text-black">Adivinar</button>
          <p :class="{ correct: message.includes('Correcto'), incorrect: message.includes('Incorrecto') }">
            {{ message }}
          </p>
        </div>
        <p v-else>Cargando personajes...</p>
      </div>
    </template>

    <script setup>
    import { ref, onMounted, computed } from "vue";
    import "@/assets/guesser.css";

    const apiUrl = "https://api.jikan.moe/v4/random/characters";
    const characterName = ref("");
    const characterImage = ref("");
    var characters = [];
    const animeTitle = ref("");
    const userGuess = ref("");
    const message = ref("");
    const showSuggestions = ref(false);

    async function fetchAnime() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        characterName.value = data.data.name;
        characterImage.value = data.data.images.jpg.image_url;
        characters.push(characterName.value);
        console.log(characterName.value);
        fetchCharacters();
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    }

    async function fetchCharacters() {
      for (let i = 0; i < 30; i++) {
        const response = await fetch(apiUrl);
        const data = await response.json();
        characters.push(data.data.name);
      }
    }

    function checkGuess() {
      if (!characterName.value) return;
      const correctName = characterName.value.toLowerCase();
      if (userGuess.value.toLowerCase() === correctName) {
        message.value = "¡Correcto! 🎉";
        setTimeout(fetchAnime, 2000);
      } else {
        message.value = "Incorrecto, intenta otra vez. ❌";
      }
      showSuggestions.value = false;
    }

    const filteredSuggestions = computed(() => {
      if (!userGuess.value) return [];
      return characters
        .filter((name) => name.toLowerCase().includes(userGuess.value.toLowerCase()))
        .slice(0, 5);
    });

    function selectSuggestion(name) {
      userGuess.value = name;
      showSuggestions.value = false;
    }

    onMounted(fetchAnime);
    </script>

    <style scoped>

    </style>
