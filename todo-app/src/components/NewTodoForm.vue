<template>
  <form class="new-todo" @submit.prevent="submit">
    <input
      v-model="title"
      type="text"
      placeholder="What needs doing?"
      aria-label="New todo"
      autocomplete="off"
    />
    <button class="btn primary" :disabled="!title.trim()">Add</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['add'])
const title = ref('')

function submit() {
  const t = title.value.trim()
  if (!t) return
  emit('add', {
    id: Date.now().toString(),
    title: t,
    done: false,
    createdAt: new Date().toISOString()
  })
  title.value = ''
}
</script>
