<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Inicio</RouterLink>
      <RouterLink to="/catalogo">Catálogo</RouterLink>
      <RouterLink to="/galeria">Galería</RouterLink>
      <RouterLink to="/quienes-somos">¿Quiénes somos?</RouterLink>
      <RouterLink to="/#opiniones">Opiniones</RouterLink>
      <RouterLink to="/contacto">Contacto</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>