<template>
  <li class="todo-item">
    <label class="checkbox" aria-label="toggle todo">
      <input type="checkbox" v-model="localDone" @change="toggle" />
      <span class="checkmark"></span>
    </label>

    <div class="content">
      <div v-if="!isEditing" class="title-row">
        <h3 :class="{ done: todo.done }">{{ todo.title }}</h3>
        <div class="meta">
          <small>{{ prettyDate }}</small>
          <div class="actions">
            <button @click="startEdit" title="Edit" aria-label="Edit todo">✏️</button>
            <button @click="$emit('delete', todo.id)" title="Delete" aria-label="Delete todo">🗑️</button>
          </div>
        </div>
      </div>

      <div v-else class="edit-row">
        <input v-model="editTitle" @keyup.enter="saveEdit" />
        <div style="display:flex; gap:8px;">
          <button class="btn" @click="saveEdit">Save</button>
          <button class="btn" @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
const props = defineProps({ todo: Object })
const emit = defineEmits(['update', 'delete', 'toggle'])

const isEditing = ref(false)
const editTitle = ref(props.todo.title)
const localDone = ref(props.todo.done)

watch(() => props.todo.done, v => localDone.value = v)
watch(() => props.todo.title, v => { if (!isEditing.value) editTitle.value = v })

function toggle () {
  emit('toggle', props.todo.id, localDone.value)
}

function startEdit () {
  editTitle.value = props.todo.title
  isEditing.value = true
}

function saveEdit () {
  const t = (editTitle.value || '').trim()
  if (!t) return
  emit('update', { ...props.todo, title: t })
  isEditing.value = false
}

function cancelEdit () {
  editTitle.value = props.todo.title
  isEditing.value = false
}

const prettyDate = computed(() => {
  try { return new Date(props.todo.createdAt).toLocaleString() } catch(e) { return '' }
})
</script>
