<template>
  <section class="mt-5 flex flex-col">
  <button
    v-for="{name, id} in options"
    :key="id"
    @click="$emit('selectedOption', id)"
    class="disabled:shadow-none disabled:bg-gray-100"
    :disabled="blockSelection"
    >
    {{ name }}
  </button>
    <!--<ul class="mt-4">
      <li>Pokemon 1</li>
      <li>Pokemon 2</li>
      <li>Pokemon 3</li>
      <li>Pokemon 4</li>
    </ul>-->
  </section>
</template>

<script setup lang="ts">

import type { Pokemon } from '../interfaces'

interface Props {
  options: Pokemon[];
  blockSelection: boolean;
}

defineProps<Props>();

defineEmits<{
  selectedOption: [id: number]
}>();


</script>

<style scoped>

  button {
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
  }

</style>
