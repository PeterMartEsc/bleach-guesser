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
        </div>
        <p v-else>Cargando personajes...</p>
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
  
    const apiUrl = "https://api.jikan.moe/v4/random/anime";
    const images = ref("");
    const title = ref("");
    var titles = [];
    
    const userGuess = ref("");
    const message = ref("");
    const showSuggestions = ref(false);
  
    async function fetchRandomAnime() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        title.value = data.data.title;
        images.value = data.data.images.jpg.large_image_url;

        titles = [];
        message.value = "";
        userGuess.value = "";
        console.log(title.value)
        titles.push(title.value);
        fetchAnimes();
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    }

    async function fetchAnimes () {
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
        setTimeout(fetchRandomAnime, 2000);
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

    onMounted(fetchRandomAnime);
    </script>
  
    <style scoped>
  
    </style>
  