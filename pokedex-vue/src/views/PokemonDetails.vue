<template>
  <div>
    <button @click="goBack" style="margin-bottom:12px;">← Back</button>

    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Loading...
    </div>

    <div v-if="error" style="color: red">{{ error }}</div>

    <div v-if="pokemon" class="details">
      <div class="top">
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
        <div class="meta">
          <h2>{{ capitalize(pokemon.name) }} (#{{
            pokemon.id
          }})</h2>
          <p>Type: <span v-for="t in pokemon.types" :key="t.type.name">{{ capitalize(t.type.name) }} </span></p>
          <p>Height: {{ pokemon.height }} decimeters</p>
          <p>Weight: {{ pokemon.weight }} hectograms</p>
          <p>Abilities: <span v-for="a in pokemon.abilities" :key="a.ability.name">{{ capitalize(a.ability.name) }} </span></p>
          <p>Can evolve: <strong>{{ canEvolve ? "Yes" : "No" }}</strong></p>
        </div>
      </div>

      <div class="evolution" v-if="evolutionChain">
        <h3>Evolution chain</h3>
        <ol>
          <li v-for="name in evolutionList" :key="name">{{ capitalize(name) }}</li>
        </ol>
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
.details .top { display:flex; gap:20px; align-items:center; }
.details img { width: 160px; height:160px; image-rendering: pixelated; }
.meta h2 { margin: 0 0 8px; }
.evolution { margin-top: 16px; }
.loading { text-align:center; }
</style>
