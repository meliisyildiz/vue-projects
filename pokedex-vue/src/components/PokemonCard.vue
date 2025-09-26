<template>
  <div class="pokemon-card" :class="`type-${decidePrimaryType(pokemon.types)}`">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    <h3>{{ capitalize(pokemon.name) }}</h3>
    <p>
      Type:
      <span> {{ prepareTypes(pokemon.types) }}</span>
    </p>
    <button class="favorite-btn" @click="toggleFavorite(pokemon)">
      <i :class="isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  pokemon: Object,
});

const isFavorite = ref(false);

// Check localStorage on component mount to set initial favorite status
onMounted(() => {
  const favorites = JSON.parse(localStorage.getItem("favorite-pokemons")) || [];
  isFavorite.value = favorites.includes(props.pokemon.id);
});

function toggleFavorite(pokemon) {
  isFavorite.value = !isFavorite.value;
  // Save the result to localStorage as array of favorite IDs
  if (isFavorite.value) {
    localStorage.setItem(
      `favorite-pokemons`,

      JSON.stringify([
        ...(JSON.parse(localStorage.getItem(`favorite-pokemons`)) || []),
        pokemon.id,
      ])
    );
  } else {
    const favorites =
      JSON.parse(localStorage.getItem(`favorite-pokemons`)) || [];
    const index = favorites.indexOf(pokemon.id);
    if (index > -1) {
      favorites.splice(index, 1);
      localStorage.setItem(`favorite-pokemons`, JSON.stringify(favorites));
    }
  }
}

const prepareTypes = (types) => {
  return types.map((t) => capitalize(t.type.name)).join(" - ");
};

const decidePrimaryType = (types) => {
  // If the Pokémon has a 'normal' type, use the second type if available
  if (types.some((t) => t.type.name === "normal") && types.length > 1) {
    return types.find((t) => t.type.name !== "normal").type.name;
  }
  // Otherwise, return the first type
  return types[0].type.name;
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.pokemon-card.type-normal {
  background: linear-gradient(135deg, #a8a77a, #c6c6a7);
}
.pokemon-card.type-fire {
  background: linear-gradient(135deg, #ee8130, #f5ac78);
}
.pokemon-card.type-water {
  background: linear-gradient(135deg, #6390f0, #9db7f5);
}
.pokemon-card.type-electric {
  background: linear-gradient(135deg, #f7d02c, #fae078);
}
.pokemon-card.type-grass {
  background: linear-gradient(135deg, #7ac74c, #a7db8d);
}
.pokemon-card.type-ice {
  background: linear-gradient(135deg, #96d9d6, #bce6e6);
}
.pokemon-card.type-fighting {
  background: linear-gradient(135deg, #c22e28, #d67873);
}
.pokemon-card.type-poison {
  background: linear-gradient(135deg, #a33ea1, #c183c1);
}
.pokemon-card.type-ground {
  background: linear-gradient(135deg, #e2bf65, #ebd69d);
}
.pokemon-card.type-flying {
  background: linear-gradient(135deg, #a98ff3, #c6b7f5);
}
.pokemon-card.type-psychic {
  background: linear-gradient(135deg, #f95587, #fa92b2);
}
.pokemon-card.type-bug {
  background: linear-gradient(135deg, #a6b91a, #c6d16e);
}
.pokemon-card.type-rock {
  background: linear-gradient(135deg, #b6a136, #d1c17d);
}
.pokemon-card.type-ghost {
  background: linear-gradient(135deg, #735797, #a292bc);
}
.pokemon-card.type-dragon {
  background: linear-gradient(135deg, #6f35fc, #a27dfa);
}
.pokemon-card.type-dark {
  background: linear-gradient(135deg, #705746, #a29288);
}
.pokemon-card.type-steel {
  background: linear-gradient(135deg, #b7b7ce, #d1d1e0);
}
.pokemon-card.type-fairy {
  background: linear-gradient(135deg, #d685ad, #f4bdc9);
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
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
