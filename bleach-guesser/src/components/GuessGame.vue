<template>
    <div class="container">
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
          <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions">
            <li v-for="(name, index) in filteredSuggestions" :key="index" @click="selectSuggestion(name)">
              {{ name }}
            </li>
          </ul>
        </div>
        <button @click="checkGuess">Adivinar</button>
        <p :class="{ correct: message.includes('Correcto'), incorrect: message.includes('Incorrecto') }">
          {{ message }}
        </p>
      </div>
      <p v-else>Cargando personajes...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  
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
  .container {
    text-align: center;
    font-family: Arial, sans-serif;
    margin-top: 20px;
  }
  .character-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .character-image {
    width: 200px;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .input-container {
    position: relative;
    display: inline-block;
  }
  input {
    padding: 8px;
    font-size: 16px;
    width: 220px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
  }
  .suggestions {
    position: absolute;
    background: #282C59;
    border: 1px solid #ddd;
    width: 100%;
    max-height: 150px;
    overflow-y: auto;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 4px;
    z-index: 10;
  }
  .suggestions li {
    padding: 8px;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
  }
  .suggestions li:hover {
    background: #7CB5A5;
    color: #000;
  }
  button {
    padding: 10px;
    background-color: #282C59;
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    border-radius: 4px;
  }
  .correct {
    color: green;
  }
  .incorrect {
    color: red;
  }
  </style>
  