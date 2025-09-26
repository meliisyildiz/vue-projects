<template>
  <div id="app">
    <header class="app-header">
      <h1><i class="fas fa-circle-notch"></i> Pokédex</h1>
      <p>Gotta Fetch 'Em All!</p>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

<style>
.app-header { text-align: center; padding: 20px; }
main { padding: 0 20px 40px; }
</style>
