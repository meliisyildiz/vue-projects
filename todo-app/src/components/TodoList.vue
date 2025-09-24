<template>
  <div>
    <div class="controls">
      <input class="search" v-model="q" placeholder="Search todos..." />
      <div class="filter-btns">
        <button :class="{active: filter === 'all'}" @click="setFilter('all')">All</button>
        <button :class="{active: filter === 'active'}" @click="setFilter('active')">Active</button>
        <button :class="{active: filter === 'completed'}" @click="setFilter('completed')">Completed</button>
      </div>
    </div>

    <transition-group name="list" tag="ul" class="todo-list">
      <TodoItem
        v-for="t in filtered"
        :key="t.id"
        :todo="t"
        @update="onUpdate"
        @delete="onDelete"
        @toggle="onToggle"
      />
    </transition-group>

    <div class="footer">
      <span>{{ remaining }} left • {{ todos.length }} total</span>
      <div>
        <button class="btn ghost" @click="$emit('clear-completed')">Clear completed</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TodoItem from './TodoItem.vue'

const props = defineProps({ todos: { type: Array, default: () => [] } })
const emit = defineEmits(['update', 'delete', 'toggle', 'clear-completed'])

const q = ref('')
const filter = ref('all')

function setFilter(f) { filter.value = f }

const filtered = computed(() => {
  const query = q.value.trim().toLowerCase()
  return props.todos
    .filter(t => {
      if (filter.value === 'active') return !t.done
      if (filter.value === 'completed') return t.done
      return true
    })
    .filter(t => (t.title || '').toLowerCase().includes(query))
})

const remaining = computed(() => props.todos.filter(t => !t.done).length)

function onUpdate(todo) { emit('update', todo) }
function onDelete(id) { emit('delete', id) }
function onToggle(id, done) { emit('toggle', id, done) }
</script>
