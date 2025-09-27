<template>
  <div class="home">
    <div class="home-header">
      <h2>🛸 Characters</h2>
      <input
        v-model="search"
        class="search-input"
        type="text"
        placeholder="Search characters..."
      />
    </div>

    <div class="card-grid">
      <div
        v-for="character in filteredCharacters"
        :key="character.id"
        class="card"
        @click="goToDetails(character.id)"
      >
        <img :src="character.image" :alt="character.name" />
        <h3>{{ character.name }}</h3>
        <p>Status: {{ character.status }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const characters = ref([]);
const search = ref("");

onMounted(async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  characters.value = data.results;
});

const filteredCharacters = computed(() =>
  characters.value
    .filter((c) =>
      c.name.toLowerCase().includes(search.value.toLowerCase())
    )
    .slice(0, 12)
);

function goToDetails(id) {
  router.push(`/character/${id}`);
}
</script>
<style scoped>
.home {
  flex: 1;
  padding: 2rem;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: .5rem;
}
</style>
