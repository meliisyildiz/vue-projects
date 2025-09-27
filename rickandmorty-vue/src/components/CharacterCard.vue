<template>
  <router-link :to="{ name: 'Character', params: { id: character.id } }" class="card">
    <img :src="character.image" :alt="character.name" />
    <div class="body">
      <h3>{{ character.name }}</h3>
      <p class="meta">
        <span>{{ character.species }} • {{ character.gender }}</span>
        <span class="status" :class="character.status.toLowerCase()">{{ character.status }}</span>

      </p>
    </div>
  </router-link>
</template>

<script setup>
const props = defineProps < { character: Character } > (any);
</script>

<style scoped>
.card {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 6px 20px rgba(2, 6, 23, 0.08);
  transition: transform .12s;
  background: white;
}

.card:hover {
  transform: translateY(-6px);
}

img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.body {
  padding: .7rem;
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: .9rem;
  color: #6b7280;
  margin-top: .3rem;
}

.status.alive {
  color: #16a34a;
  font-weight: 600;
}

.status.dead {
  color: #ef4444;
  font-weight: 600;
}

.status.unknown {
  color: #9ca3af;
  font-weight: 600;
}
.details {
  flex: 1; /* makes it grow to fill space */
  display: flex;
  justify-content: center;
  align-items: center; /* centers card vertically too */
  padding: 2rem;
}
</style>
