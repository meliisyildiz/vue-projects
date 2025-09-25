<template>
  <div id="app">
    <h1><i class="fas fa-circle-notch"></i> Pokédex</h1>
    <p>Gotta Fetch 'Em All!</p>

    <div>
      <input v-model="searchQuery" type="text" placeholder="Enter Pokémon name or ID">
      <button @click="searchPokemon">
        <i class="fas fa-magnifying-glass"></i> Search
      </button>
      <button @click="resetSearch">
        <i class="fas fa-rotate-right"></i> Reset
      </button>
    </div>

    <div v-if="error" style="color:red; margin-top: 15px;">{{ error }}</div>

    <PokemonGrid v-if="pokemons.length > 0" :pokemons="pokemons" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PokemonGrid from './components/PokemonGrid.vue'

const pokemons = ref([])
const searchQuery = ref('')
const error = ref('')

async function searchPokemon() {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    error.value = 'Please enter a Pokémon name or ID'
    return
  }
  error.value = ''
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    if (!response.ok) {
      throw new Error('Not found')
    }
    const pokemon = await response.json()
    pokemons.value = [pokemon]
  } catch {
    error.value = 'Pokémon not found'
    pokemons.value = []
  }
}

function resetSearch() {
  searchQuery.value = ''
  pokemons.value = []
  error.value = ''
}
</script>
