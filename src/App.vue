<script setup>
import AppNavbar from "./components/AppNavbar.vue";
</script>

<template>
  <header>
    <AppNavbar />
  </header>
  <div id="app-main-content">
    <router-view />
  </div>
</template>

<style scoped>
#app-main-content {
  background-color: var(--background-1);
  min-height: 100vh;
}
</style>