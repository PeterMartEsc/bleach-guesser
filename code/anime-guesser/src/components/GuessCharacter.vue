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
        <!--<h1>🔍 Adivina el Personaje</h1>-->
  <section class=" w-full">
    <div v-if="characterName" class="w-full pt-[20px]">
      <div class="w-2xl h-[500px] justify-self-center">
        <img :src="characterImage" alt="Personaje" class="justify-self-center object-cover min-h-full border-2 p-2 max-w-full max-h-full"/>
      </div>

      <div class="justify-self-center pt-4">
        <input
          v-model="userGuess"
          placeholder="Escribe el nombre..."
          @input="showSuggestions = true"
          @keyup.enter="checkGuess"
        />
        <ul v-if="showSuggestions && filteredSuggestions.length" class="suggestions bg-[#e9e9e9] z-10 border-1 border-[#ddd]  w-[220px]">
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
    <p v-else>Cargando personajes...</p>
  </section>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import "@/assets/guesser.css";

  const apiUrl = "https://api.jikan.moe/v4/random/characters";
  const characterName = ref("");
  const characterImage = ref("");
  var characters = [];
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
      .filter((name) => name.toLowerCase().startsWith(userGuess.value.toLowerCase()))
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
