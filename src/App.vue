<template>
  <div class="app">
    <div class="container">
      <div class="header">
        <div class="title">
          <h1>My To-Do</h1>
          <p>Turn your thoughts into action — one task at a time.</p>
        </div>
        <div style="text-align:right">
          <div style="font-weight:600">{{ remaining }} left</div>
          <div style="color:var(--muted); font-size:0.9rem">{{ completed }} completed</div>
        </div>
      </div>

      <NewTodoForm @add="addTodo" />

      <TodoList
        :todos="todos"
        @update="updateTodo"
        @delete="deleteTodo"
        @toggle="toggleTodo"
        @clear-completed="clearCompleted"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import NewTodoForm from './components/NewTodoForm.vue'
import TodoList from './components/TodoList.vue'

const STORAGE_KEY = 'vue-beautiful-todos-v1'
const initial = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
const todos = ref(initial)

function addTodo(payload) {
  todos.value.unshift(payload)
}

function updateTodo(updated) {
  const i = todos.value.findIndex(t => t.id === updated.id)
  if (i !== -1) todos.value.splice(i, 1, { ...todos.value[i], ...updated })
}

function deleteTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}

function toggleTodo(id, done) {
  const i = todos.value.findIndex(t => t.id === id)
  if (i !== -1) todos.value[i].done = !!done
}

function clearCompleted() {
  todos.value = todos.value.filter(t => !t.done)
}

watch(todos, (v) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
}, { deep: true })

const remaining = computed(() => todos.value.filter(t => !t.done).length)
const completed = computed(() => todos.value.filter(t => t.done).length)
</script>
