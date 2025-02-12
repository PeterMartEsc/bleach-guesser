<template>
  <section class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokémons</h3>
    <CharacterPicture/>
  </section>
</template>

<script setup lang="ts">
import CharacterPicture from '@/components/CharacterPicture.vue';
import { RouterLink, RouterView } from 'vue-router'

</script>

<style scoped>

</style>
