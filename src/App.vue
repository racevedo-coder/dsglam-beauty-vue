<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterSite from './components/FooterSite.vue'
</script>

<template>
  <NavBar />
  <RouterView />
  <FooterSite />
</template>