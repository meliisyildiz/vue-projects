<template>
  <div id="app">
    <header class="navbar">
      <h1>Rick & Morty Explorer 🚀⋆⭒˚⋆🔭</h1>
      <nav>
        <router-link to="/">🛰️Home</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer class="footer">
      <p>All rights belong to Melis˗ˏˋ ★ ˎˊ˗</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  flex-shrink: 0;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.footer {
  flex-shrink: 0;
  margin-top: auto;
}
</style>
