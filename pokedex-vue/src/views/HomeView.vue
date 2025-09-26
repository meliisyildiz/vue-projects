<template>
  <div>
    <div class="search-area" style="text-align:center; margin-bottom: 18px;">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Enter Pokémon name or ID"
      />
      <button @click="searchPokemon">
        <i class="fas fa-magnifying-glass"></i> Search
      </button>
      <button @click="resetSearch">
        <i class="fas fa-rotate-right"></i> Reset
      </button>
    </div>

    <div v-if="loading" class="loading" style="text-align:center">
      <i class="fas fa-spinner fa-spin"></i> Loading...
    </div>

    <div v-if="error" style="color: red; margin-top: 15px; text-align:center">
      {{ error }}
    </div>

    <PokemonGrid v-if="pokemons.length > 0" :pokemons="pokemons" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PokemonGrid from "@/components/PokemonGrid.vue";

const pokemons = ref([]);
const searchQuery = ref("");
const error = ref("");
const loading = ref(false);

async function searchPokemon() {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) {
    error.value = "Please enter a Pokémon name or ID";
    return;
  }
  error.value = "";
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      throw new Error("Not found");
    }
    const pokemon = await response.json();
    pokemons.value = [pokemon];
  } catch {
    error.value = "Pokémon not found";
    pokemons.value = [];
  }
}

const fetchInitialPokemons = async () => {
  const promises = [];
  loading.value = true;
  for (let i = 1; i <= 50; i++) {
    promises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
    );
  }
  pokemons.value = await Promise.all(promises);
  loading.value = false;
};

onMounted(() => {
  fetchInitialPokemons();
});

function resetSearch() {
  searchQuery.value = "";
  pokemons.value = [];
  error.value = "";
  fetchInitialPokemons();
}
</script>

<style scoped>
.search-area input { padding: 8px; width: 220px; margin-right: 8px; }
.search-area button { padding: 8px 10px; margin-left: 4px; }
.loading { font-size: 1.1rem; margin-top: 20px; }
</style>
