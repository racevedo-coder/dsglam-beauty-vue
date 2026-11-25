<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const menuAbierto = ref(false)
const route = useRoute()
const esInicio = computed(() => route.name === 'home')
</script>

<template>
  <header :class="esInicio ? 'header' : 'header-interno'">
    <div class="barra">
      <h2>DsGlam-Beauty</h2>
      <nav class="nav" aria-label="Navegación principal">
        <input type="checkbox" id="menu-toggle" class="menu-toggle" v-model="menuAbierto" />
        <label for="menu-toggle" class="menu-boton" aria-label="Abrir menú">
          <i class="fa-solid fa-bars" aria-hidden="true"></i>
        </label>
        <ul @click="menuAbierto = false">
          <li><RouterLink to="/">Inicio</RouterLink></li>
          <li><RouterLink to="/catalogo">Catálogo</RouterLink></li>
          <li><RouterLink to="/galeria">Galería</RouterLink></li>
          <li><RouterLink to="/quienes-somos">¿Quiénes somos?</RouterLink></li>
          <li>
            <RouterLink to="/#opiniones" custom v-slot="{ href, navigate }">
              <a :href="href" @click="navigate">Opiniones</a>
            </RouterLink>
          </li>
          <li><RouterLink to="/contacto">Contacto</RouterLink></li>
        </ul>
      </nav>
    </div>
  </header>
</template>