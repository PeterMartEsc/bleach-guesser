<template>
  <div class="container">
    <header class="header">
      <div class="bg-[#ccc]">
        <h1 class="text-black">Bleach Guesser</h1>
      </div>
    </header>
    <br>
      <h1>🔍 Adivina el Personaje de Bleach</h1>
      <div v-if="currentCharacter" class="character-container">
        <img :src="currentCharacter.character.images.jpg.image_url" alt="Personaje" class="character-image"/>
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
  
  const apiUrl = "https://api.jikan.moe/v4/anime/269/characters";
  const characters = ref([]);
  const currentCharacter = ref(null);
  const userGuess = ref("");
  const message = ref("");
  const showSuggestions = ref(false);
  
  async function fetchCharacters() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      characters.value = data.data.filter((char) => char.character);
      pickRandomCharacter();
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
  