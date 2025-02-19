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

    <div class="container">
      <!-- Imagen del anime -->
      <div v-if="titles" class="character-container">
          <img :src="images" class="character-image"/>
      </div>
      <p v-else>Cargando personajes...</p>

      <!-- Input del anime -->
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
      <!-- Botón de adivinar -->
      <button @click="checkGuess" class="bg-[#ccc] text-black">Adivinar</button>
      <p :class="{ correct: message.includes('Correcto'), incorrect: message.includes('Incorrecto') }">
        {{ message }}
      </p>
    </div>
</template>

<script setup>

  /**
   * Componente principal de Acertar el Anime
   * @name GuessAnime
   * @description Uno de los 3 componentes de juego de nuestra aplicación
   */
  import { ref, onMounted, computed } from "vue";
  import "@/assets/guesser.css";

  /**
   * Parametros para el funcionamiento
   * @param {String} apiUrl url de la api a consumir
   * @param {String} images imagen cargada para el juego
   * @param {String} title titulo del anime
   * @param {String} titles titulos obtenidos para el juego, tanto opciones como el titulo del anime a acertar
   * @param {String} userGuess intento de acierto del usuario
   * @param {String} message mensaje de respuesta del juego según haya acertado o errado
   * @param {String} showSuggestions booleano que indica si se muestran las sugerencias o no
   */
  const apiUrl = "https://api.jikan.moe/v4/random/anime";
  const images = ref("");
  const title = ref("");
  var titles = [];

  const userGuess = ref("");
  const message = ref("");
  const showSuggestions = ref(false);

  /**
   * Función que obtiene un anime aleatorio
   * @method fetchRandomAnime
   */

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

  /**
   * Funcion que obtiene 30 títulos y los une a las opciones del desplegable
   * @method fetchAnimes
   */
  async function fetchAnimes () {
    for (let i = 0; i < 30; i++) {
      const response = await fetch(apiUrl);
      const data = await response.json();
      titles.push(data.data.title);
    }
    console.log(titles);
  }


  /**
   * Funcion que comprueba si la respuesta introducida es correcta
   * @method checkGuess
   */
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

  /**
   * Constante que contiene las sugerencias filtradas
   * @method filteredSuggestions
   */

  const filteredSuggestions = computed(() => {
    if (!userGuess.value) return [];
    return titles
      .filter((name) => name.toLowerCase().startsWith(userGuess.value.toLowerCase()))
      .slice(0, 5);
  });

  /**
   * Función que selecciona una sugerencia a partir del nombre
   * @method selectSuggestion
   */
  function selectSuggestion(name) {
    userGuess.value = name;
    showSuggestions.value = false;
  }

  onMounted(fetchRandomAnime);
</script>

<style scoped>

</style>
