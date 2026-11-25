<script setup>
import { ref, computed } from 'vue'
import { useServiciosStore } from '../stores/servicios'
import ServicioCard from '../components/ServicioCard.vue'

const store = useServiciosStore()
store.cargar()

const categorias = ['Todos', 'Maquillaje', 'Peinados', 'Cejas y pestañas', 'Tratamientos capilares']
const categoriaActiva = ref('Todos')

const serviciosFiltrados = computed(() => {
  if (categoriaActiva.value === 'Todos') {
    return store.servicios
  }
  return store.servicios.filter((s) => s.categoria === categoriaActiva.value)
})
</script>

<template>
  <main class="main">
    <section class="sectioncatalogo">
      <h1>Nuestros servicios</h1>
      <nav class="nav-catalogo" aria-label="Categorías de servicios">
        <ul>
          <li v-for="categoria in categorias" :key="categoria">
            <a
              href="#"
              :class="{ activo: categoria === categoriaActiva }"
              @click.prevent="categoriaActiva = categoria"
            >
              {{ categoria }}
            </a>
          </li>
        </ul>
      </nav>
    </section>

    <section class="sectionservicios">
      <p v-if="store.cargando" class="cargando">Cargando servicios...</p>

      <div v-else-if="store.error" class="error-carga">
        <p>{{ store.error }}</p>
        <button type="button" @click="store.cargar()">Reintentar</button>
      </div>

      <template v-else>
        <ServicioCard v-for="servicio in serviciosFiltrados" :key="servicio.id" :servicio="servicio" />
      </template>
    </section>
  </main>
</template>