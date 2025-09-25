<template>
  <div class="pokemon-grid">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
  </div>
</template>

<script setup>
import PokemonCard from './PokemonCard.vue'

defineProps({
  pokemons: Array
})
</script>

<style scoped>
.pokemon-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
</style>
