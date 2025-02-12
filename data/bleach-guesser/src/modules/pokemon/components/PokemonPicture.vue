<template>
  <section class="flex flex-col justify-center items-center">
    <img v-if="!showPokemon" :src="pokemonImage" class="brightness-0 h-[200px]" />
    <img v-else :src="pokemonImage" class="h-[200px]" alt="pokemon image"/>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';


interface Props{
  pokemonId: number;
  showPokemon?: boolean;
}

//const props = defineProps<Props>();

const pokemonImage = computed(
  ()=> `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemonId}.png`
)

const props = withDefaults( defineProps<Props>(), {
  showPokemon: false,
});

</script>

<style scoped>

</style>
