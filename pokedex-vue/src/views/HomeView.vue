<template>
  <div class="home-container">
    <nav class="navbar">
      <h1 class="navbar-title">
        <i class="fas fa-circle-notch pokeball-icon"></i>
        Pokédex
      </h1>
      <p class="navbar-subtitle">Gotta Fetch 'Em All!</p>
    </nav>

    <div class="search-header">
      <div class="search-section">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Pokémon by name or ID..."
            class="search-input"
            @keyup.enter="searchPokemon"
          />
          <button @click="searchPokemon" class="search-btn">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <button @click="resetSearch" class="reset-btn" v-if="searchQuery">
          <i class="fas fa-times"></i> Clear
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading-container">
      <div class="pokeball-loader"></div>
      <p class="loading-text">Loading Pokémon...</p>
    </div>

    <div v-if="error" class="error-container">
      <i class="fas fa-exclamation-triangle"></i>
      <span>{{ error }}</span>
      <button @click="resetSearch" class="error-retry-btn">Try Again</button>
    </div>

    <div class="content-area">
      <PokemonGrid v-if="pokemons.length > 0 && !loading" :pokemons="pokemons" />
    </div>
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
  loading.value = true;
  
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
    if (!response.ok) {
      throw new Error("Pokémon not found");
    }
    const pokemon = await response.json();
    pokemons.value = [pokemon];
  } catch (err) {
    error.value = "Pokémon not found. Please check the name or ID.";
    pokemons.value = [];
  } finally {
    loading.value = false;
  }
}

const fetchInitialPokemons = async () => {
  loading.value = true;
  error.value = "";
  
  try {
    const promises = [];
    for (let i = 1; i <= 50; i++) {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch Pokemon ${i}`);
          return res.json();
        })
      );
    }
    pokemons.value = await Promise.all(promises);
  } catch (err) {
    error.value = "Failed to load Pokémon. Please try again.";
  } finally {
    loading.value = false;
  }
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
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
  text-align: center;
}

.navbar-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.navbar-subtitle {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

.pokeball-icon {
  animation: spin 3s linear infinite;
  color: #ff6b6b;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.search-header {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  padding: 25px 20px;
  border-bottom: 1px solid #dee2e6;
}

.search-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  max-width: 600px;
  margin: 0 auto;
}

.search-container {
  display: flex;
  background: white;
  border-radius: 25px;
  padding: 4px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e8ed;
}

.search-input {
  border: none;
  background: transparent;
  padding: 12px 20px;
  color: #333;
  font-size: 1rem;
  width: 300px;
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

.search-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.search-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.4);
}

.reset-btn {
  background: #ff6b6b;
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.reset-btn:hover {
  background: #ff5252;
  transform: translateY(-1px);
}

.content-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.loading-container {
  text-align: center;
  padding: 80px 20px;
}

.pokeball-loader {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ff6b6b 50%, white 50%);
  border: 3px solid #333;
  position: relative;
  animation: spin 1s linear infinite;
}

.pokeball-loader::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  background: white;
  border: 3px solid #333;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.loading-text {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Error styles */
.error-container {
  text-align: center;
  padding: 40px 20px;
  margin: 30px auto;
  max-width: 500px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(238, 90, 36, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.error-container i {
  font-size: 2rem;
  opacity: 0.8;
}

.error-retry-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.error-retry-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar-title {
    font-size: 1.5rem;
  }
  
  .search-input {
    width: 250px;
  }
  
  .search-section {
    flex-direction: column;
    gap: 10px;
  }
  
  .search-header {
    padding: 20px 15px;
  }
  
  .content-area {
    padding: 20px 15px;
  }
}

@media (max-width: 480px) {
  .navbar-title {
    font-size: 1.3rem;
    flex-direction: column;
    gap: 5px;
  }
  
  .search-input {
    width: 200px;
  }
  
  .navbar-subtitle {
    font-size: 0.8rem;
  }
}
</style>