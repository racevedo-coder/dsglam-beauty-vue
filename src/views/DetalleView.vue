<script setup>
import { computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useServiciosStore } from '../stores/servicios'

const route = useRoute()
const store = useServiciosStore()
store.cargar()

const id = computed(() => Number(route.params.id))
const servicio = computed(() => store.porId(id.value))

const mensajeSinServicio = computed(() =>
  id.value ? 'No encontramos ese servicio.' : 'No indicaste qué servicio quieres ver.',
)

const sugeridos = computed(() => {
  if (!servicio.value) {
    return []
  }
  const otros = store.servicios.filter((s) => s.id !== servicio.value.id)
  const mismaCategoria = otros.filter((s) => s.categoria === servicio.value.categoria)
  const demas = otros.filter((s) => s.categoria !== servicio.value.categoria)
  return mismaCategoria.concat(demas).slice(0, 3)
})

watch(
  servicio,
  (s) => {
    if (s) {
      document.title = s.nombre + ' | DsGlam-Beauty'
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.title = 'DsGlam-Beauty'
})
</script>

<template>
  <main class="main-detalle" id="detalle" aria-live="polite">
    <p v-if="store.cargando" class="cargando">Cargando servicio...</p>

    <div v-else-if="store.error" class="error-carga">
      <p>{{ store.error }}</p>
      <RouterLink to="/catalogo" class="btn btn-detalle-sm">Volver al catálogo</RouterLink>
    </div>

    <div v-else-if="!servicio" class="error-carga">
      <p>{{ mensajeSinServicio }}</p>
      <RouterLink to="/catalogo" class="btn btn-detalle-sm">Volver al catálogo</RouterLink>
    </div>

    <template v-else>
      <nav class="breadcrumb-detalle" aria-label="Ruta de navegación">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><RouterLink to="/catalogo">Catálogo</RouterLink></li>
          <li class="breadcrumb-item"><RouterLink to="/catalogo">{{ servicio.categoria }}</RouterLink></li>
          <li class="breadcrumb-item active" aria-current="page">{{ servicio.nombre }}</li>
        </ol>
      </nav>

      <section class="seccion-detalle" aria-label="Detalle del servicio">
        <figure class="detalle-imagen">
          <img :src="'/' + servicio.imagen" :alt="servicio.nombre + ' en DsGlam-Beauty'" width="400" height="350" />
        </figure>

        <article class="detalle-info">
          <h1>{{ servicio.nombre }}</h1>
          <p class="detalle-subtitulo">{{ servicio.subtitulo }}</p>

          <div class="detalle-precio-box">
            <span class="badge badge-precio fs-5">{{ servicio.precio }}</span>
            <a
              class="btn btn-contacto"
              href="https://wa.link/yz34tq"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="'Contactar por WhatsApp para el servicio ' + servicio.nombre"
            >
              Contáctanos aquí
            </a>
          </div>

          <section class="detalle-especificaciones" aria-label="Especificaciones del servicio">
            <ul>
              <li v-for="e in servicio.especificaciones" :key="e.titulo">
                <i :class="e.icono" aria-hidden="true"></i>
                <strong>{{ e.titulo }}: </strong>{{ e.texto }}
              </li>
            </ul>
          </section>
        </article>
      </section>

      <section class="seccion-relacionados" aria-label="Servicios relacionados">
        <header class="relacionados-encabezado">
          <h2>También puede interesarte</h2>
          <RouterLink to="/catalogo" class="relacionados-vermas">Ver más</RouterLink>
        </header>

        <div class="relacionados-grid">
          <article v-for="s in sugeridos" :key="s.id" class="card card-relacionado">
            <img :src="'/' + s.imagen" :alt="s.nombre" class="card-img-top" loading="lazy" />
            <div class="card-body">
              <h3 class="card-title">{{ s.nombre }}</h3>
              <p class="card-text">{{ s.precio }}</p>
              <RouterLink :to="{ name: 'detalle', params: { id: s.id } }" class="btn btn-detalle-sm">
                Ver detalle →
              </RouterLink>
            </div>
          </article>
        </div>
      </section>
    </template>
  </main>
</template>