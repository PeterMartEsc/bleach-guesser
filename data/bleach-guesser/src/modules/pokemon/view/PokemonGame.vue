<template>

  <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
  </section>


  <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="m-5">¿Cual es este Pokémon?</h1>
    <h3>{{ randomPokemon }}</h3>

    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :showPokemon="gameStatus != GameStatus.Playing"
      :class="{ 'fade-in': gameStatus != GameStatus.Playing }"
    />

    <PokemonOptions
      :options="options"
      @selected-option="checkAnswer"
      :block-selection="gameStatus != GameStatus.Playing"
    />

  </section>

</template>

<script setup lang="ts">
  import PokemonPicture from '../components/PokemonPicture.vue';
  import PokemonOptions from '../components/PokemonOptions.vue';
  import { usePokemonGame } from '../composables/usePokemonGame';
  import { GameStatus } from '../interfaces';

  const {randomPokemon, isLoading, gameStatus, pokemonOptions: options, checkAnswer} = usePokemonGame();

  const onSelectedOption = (value: number) => {
    console.log({value});
  }


</script>

<style scoped>

</style>
