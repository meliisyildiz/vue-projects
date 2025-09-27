<template>
  <form @submit.prevent="onSubmit" class="search">
    <input v-model="q" placeholder="Search characters (press Enter)" />
    <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const q = ref('');
const emit = defineEmits<{ (e: 'search', query: string): void }>();

function onSubmit() {
  emit('search', q.value.trim());
}
</script>

<style scoped>
.search {
  display: flex;
  gap: .5rem;
  align-items: center;
}
input {
  flex: 1;
  padding: .6rem .8rem;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-size: 1rem;
}
button {
  padding: .5rem .8rem;
  border-radius: 8px;
  border: none;
  background: #0891b2;
  color: white;
}
</style>
