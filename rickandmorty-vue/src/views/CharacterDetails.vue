<template>
  <div class="details" v-if="character">
    <div class="details-card">
      <img :src="character.image" :alt="character.name" />
      <h2>{{ character.name }}</h2>
      <p><strong>Status:</strong> {{ character.status }}</p>
      <p><strong>Species:</strong> {{ character.species }}</p>
      <p><strong>Gender:</strong> {{ character.gender }}</p>
      <p><strong>Origin:</strong> {{ character.origin.name }}</p>
      <p><strong>Location:</strong> {{ character.location.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const character = ref(null);

onMounted(async () => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${route.params.id}`
  );
  character.value = await res.json();
});
</script>
<style scoped>
.character-details {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 100%;
}
</style>