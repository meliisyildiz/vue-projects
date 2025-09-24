<template>
  <div id="app">
    <WeatherApp />
  </div>
</template>

<script>
import WeatherApp from './components/weatherApp.vue' 

export default {
  name: 'App',
  components: {
    WeatherApp
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  min-height: 100vh;
}
</style>