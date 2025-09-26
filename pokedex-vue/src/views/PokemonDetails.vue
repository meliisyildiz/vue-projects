<template>
  <div class="pokemon-details-container">
    <button @click="goBack" class="back-button">
      <i class="fas fa-arrow-left"></i> Back to Pokédex
    </button>

    <div v-if="loading" class="loading-container">
      <div class="pokeball-loader"></div>
      <p class="loading-text">Loading Pokémon data...</p>
    </div>

    <div v-if="error" class="error-container">
      <i class="fas fa-exclamation-triangle"></i>
      {{ error }}
    </div>

    <div v-if="pokemon" class="pokemon-card">
      <div class="pokemon-header" :class="`type-${pokemon.types[0]?.type.name}`">
        <div class="pokemon-id">#{{ String(pokemon.id).padStart(3, '0') }}</div>
        <h1 class="pokemon-name">{{ capitalize(pokemon.name) }}</h1>
        <div class="type-badges">
          <span v-for="t in pokemon.types" :key="t.type.name" class="type-badge" :class="`type-${t.type.name}`">
            {{ capitalize(t.type.name) }}
          </span>
        </div>
      </div>

      <div class="pokemon-content">
        <div class="pokemon-showcase">
          <div class="image-container">
            <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-image" />
            <div class="image-shadow"></div>
          </div>

          <div class="basic-stats">
            <div class="stat-item">
              <i class="fas fa-ruler-vertical"></i>
              <span class="stat-label">Height</span>
              <span class="stat-value">{{ (pokemon.height / 10).toFixed(1) }}m</span>
            </div>
            <div class="stat-item">
              <i class="fas fa-weight-hanging"></i>
              <span class="stat-label">Weight</span>
              <span class="stat-value">{{ (pokemon.weight / 10).toFixed(1) }}kg</span>
            </div>
          </div>
        </div>

        <div class="abilities-section">
          <h3 class="section-title">
            <i class="fas fa-magic"></i>
            Abilities
          </h3>
          <div class="abilities-grid">
            <div v-for="a in pokemon.abilities" :key="a.ability.name" class="ability-card"
              :class="{ 'hidden-ability': a.is_hidden }">
              <span class="ability-name">{{ capitalize(a.ability.name) }}</span>
              <span v-if="a.is_hidden" class="hidden-tag">Hidden</span>
            </div>
          </div>
        </div>

        <div class="evolution-section" v-if="evolutionChain && evolutionList.length > 1">
          <h3 class="section-title">
            <i class="fas fa-exchange-alt"></i>
            Evolution Chain
          </h3>
          <div class="evolution-chain">
            <div v-for="(name, index) in evolutionList" :key="name" class="evolution-stage">
              <div class="evolution-pokemon" :class="{ 'current': name === pokemon.name }">
                <div class="evolution-number">{{ index + 1 }}</div>
                <span class="evolution-name">{{ capitalize(name) }}</span>
              </div>
              <div v-if="index < evolutionList.length - 1" class="evolution-arrow">
                <i class="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <div class="evolution-status">
            <i :class="canEvolve ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            <span>{{ canEvolve ? "Can evolve further" : "Final evolution stage" }}</span>
          </div>
        </div>

        <div v-else-if="evolutionChain && evolutionList.length === 1" class="no-evolution">
          <i class="fas fa-star"></i>
          <span>This Pokémon does not evolve</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const pokemon = ref(null);
const evolutionChain = ref(null);
const loading = ref(false);
const error = ref("");

const idParam = () => route.params.id;

async function fetchDetails(id) {
  loading.value = true;
  error.value = "";
  pokemon.value = null;
  evolutionChain.value = null;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error("Pokemon not found");
    pokemon.value = await res.json();

    // species -> evolution_chain
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    if (!speciesRes.ok) throw new Error("Species not found");
    const species = await speciesRes.json();

    if (species.evolution_chain && species.evolution_chain.url) {
      const evoRes = await fetch(species.evolution_chain.url);
      if (evoRes.ok) evolutionChain.value = await evoRes.json();
    }
  } catch (e) {
    error.value = e.message || "Error fetching data";
  } finally {
    loading.value = false;
  }
}

function goBack() {
  router.back();
}

function walkChainList(chain) {
  const list = [];
  function walk(node) {
    list.push(node.species.name);
    if (node.evolves_to && node.evolves_to.length) {
      node.evolves_to.forEach(walk);
    }
  }
  if (chain && chain.chain) walk(chain.chain);
  return list;
}

function canChainEvolve(chain) {
  if (!chain || !chain.chain) return false;
  let found = false;
  function walk(node) {
    if (node.evolves_to && node.evolves_to.length > 0) {
      found = true;
    }
    node.evolves_to.forEach(walk);
  }
  walk(chain.chain);
  return found;
}

const evolutionList = ref([]);
const canEvolve = ref(false);

onMounted(() => {
  fetchDetails(idParam());
});

watch(
  () => route.params.id,
  (newId) => {
    fetchDetails(newId);
  }
);

watch(evolutionChain, (v) => {
  evolutionList.value = walkChainList(v);
  canEvolve.value = canChainEvolve(v);
});

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}
</script>

<style scoped>
.pokemon-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Loading styles */
.loading-container {
  text-align: center;
  padding: 60px 20px;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

.error-container {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(238, 90, 36, 0.3);
}

.pokemon-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.pokemon-card:hover {
  transform: translateY(-5px);
}

.pokemon-header {
  padding: 30px 20px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.pokemon-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: inherit;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  50% {
    transform: translate(-10px, -10px) rotate(180deg);
  }
}

.type-fire {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
}

.type-water {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
}

.type-grass {
  background: linear-gradient(135deg, #00b894, #00cec9);
}

.type-electric {
  background: linear-gradient(135deg, #fdcb6e, #f39c12);
}

.type-psychic {
  background: linear-gradient(135deg, #fd79a8, #e84393);
}

.type-ice {
  background: linear-gradient(135deg, #74b9ff, #a29bfe);
}

.type-dragon {
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
}

.type-dark {
  background: linear-gradient(135deg, #636e72, #2d3436);
}

.type-fairy {
  background: linear-gradient(135deg, #fd79a8, #fdcb6e);
}

.type-fighting {
  background: linear-gradient(135deg, #e17055, #d63031);
}

.type-poison {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7);
}

.type-ground {
  background: linear-gradient(135deg, #fdcb6e, #e17055);
}

.type-flying {
  background: linear-gradient(135deg, #74b9ff, #a29bfe);
}

.type-bug {
  background: linear-gradient(135deg, #00b894, #fdcb6e);
}

.type-rock {
  background: linear-gradient(135deg, #636e72, #b2bec3);
}

.type-ghost {
  background: linear-gradient(135deg, #6c5ce7, #2d3436);
}

.type-steel {
  background: linear-gradient(135deg, #b2bec3, #636e72);
}

.type-normal {
  background: linear-gradient(135deg, #ddd, #b2bec3);
}

.pokemon-id {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 10px;
  font-weight: 600;
}

.pokemon-name {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 10px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.type-badges {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.type-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.pokemon-content {
  padding: 30px;
}

.pokemon-showcase {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-image {
  width: 200px;
  height: 200px;
  image-rendering: pixelated;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  animation: bounce 2s ease-in-out infinite;
  z-index: 2;
  position: relative;
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

.image-shadow {
  position: absolute;
  bottom: -20px;
  width: 120px;
  height: 20px;
  background: radial-gradient(ellipse, rgba(0, 0, 0, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: shadowPulse 2s ease-in-out infinite;
}

@keyframes shadowPulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.2;
  }
}

.basic-stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  min-width: 180px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.stat-item i {
  color: #667eea;
  width: 20px;
  text-align: center;
}

.stat-label {
  color: #666;
  font-weight: 500;
}

.stat-value {
  margin-left: auto;
  font-weight: bold;
  color: #333;
  font-size: 1.1rem;
}

/* Section styles */
.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e9ecef;
}

.section-title i {
  color: #667eea;
}

/* Abilities */
.abilities-section {
  margin-bottom: 30px;
}

.abilities-grid {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.ability-card {
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 25px;
  font-weight: 600;
  position: relative;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease;
}

.ability-card:hover {
  transform: translateY(-2px);
}

.ability-card.hidden-ability {
  background: linear-gradient(135deg, #fd79a8, #e84393);
  box-shadow: 0 4px 15px rgba(253, 121, 168, 0.3);
}

.hidden-tag {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #fff;
  color: #fd79a8;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: bold;
}

.evolution-section {
  margin-bottom: 20px;
}

.evolution-chain {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.evolution-stage {
  display: flex;
  align-items: center;
  gap: 15px;
}

.evolution-pokemon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 15px;
  min-width: 120px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.evolution-pokemon.current {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.evolution-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.evolution-pokemon.current .evolution-number {
  background: white;
  color: #667eea;
}

.evolution-name {
  font-weight: 600;
  text-align: center;
}

.evolution-arrow {
  color: #667eea;
  font-size: 1.2rem;
}

.evolution-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 15px;
  font-weight: 500;
}

.evolution-status i.fa-check-circle {
  color: #00b894;
}

.evolution-status i.fa-times-circle {
  color: #e17055;
}

.no-evolution {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  background: linear-gradient(135deg, #fdcb6e, #f39c12);
  color: white;
  border-radius: 15px;
  font-weight: 600;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .pokemon-details-container {
    padding: 15px;
  }

  .pokemon-showcase {
    flex-direction: column;
    gap: 20px;
  }

  .pokemon-name {
    font-size: 2rem;
  }

  .abilities-grid {
    justify-content: center;
  }

  .evolution-chain {
    flex-direction: column;
  }

  .evolution-arrow {
    transform: rotate(90deg);
  }
}

@media (max-width: 480px) {
  .pokemon-image {
    width: 150px;
    height: 150px;
  }

  .pokemon-name {
    font-size: 1.8rem;
  }

  .basic-stats {
    align-items: center;
  }
}
</style>