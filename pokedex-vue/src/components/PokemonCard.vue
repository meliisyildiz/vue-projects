<template>
  <div class="pokemon-card">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    <h3>{{ capitalize(pokemon.name) }}</h3>
    <p>Type: <span v-for="t in pokemon.types" :key="t.type.name">{{ capitalize(t.type.name) }} </span></p>
    <button class="favorite-btn" @click="toggleFavorite">
      <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  pokemon: Object
})

const isFavorite = ref(false)

function toggleFavorite() {
  isFavorite.value = !isFavorite.value
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
</script>

<style scoped>
.pokemon-card {
  display: inline-block;
  background: linear-gradient(135deg, #fddf90, #ffb3ba);
  border-radius: 15px;
  padding: 15px;
  margin: 10px;
  width: 180px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.pokemon-card img {
  width: 120px;
  height: 120px;
  image-rendering: pixelated;
  margin-bottom: 10px;
}

.pokemon-card h3 {
  margin: 5px 0;
  color: #333;
}

.pokemon-card p {
  font-size: 0.9rem;
  margin: 5px 0;
  color: #555;
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #ff4f75;
  transition: transform 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.2);
}
</style>
