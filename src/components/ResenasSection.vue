<script setup>
import { ref, onMounted } from 'vue'

const resenasBase = ref([])
const cargando = ref(true)
const error = ref('')

async function cargarResenas() {
  cargando.value = true
  error.value = ''

  try {
    const respuesta = await fetch('/data.json')

    if (!respuesta.ok) {
      const fallo = new Error('Error HTTP')
      fallo.estado = respuesta.status
      throw fallo
    }

    resenasBase.value = await respuesta.json()
  } catch (e) {
    if (e.estado === 404) {
      error.value = 'No encontramos las opiniones (error 404).'
    } else if (e.estado >= 500) {
      error.value = 'El servidor tiene problemas, intenta más tarde (error ' + e.estado + ').'
    } else if (e.estado) {
      error.value = 'No se pudieron cargar las opiniones (error ' + e.estado + ').'
    } else {
      error.value = 'Revisa tu conexión a internet e intenta de nuevo.'
    }
  } finally {
    cargando.value = false
  }
}

onMounted(cargarResenas)
</script>

<template>
  <section class="sectionresenas" id="opiniones" aria-label="Opiniones de clientas">
    <h2>Lo que dicen nuestras clientas</h2>
    <button type="button" id="abrir-opinion" class="btn-ver">Escribir una opinión</button>

    <div id="resenas" class="resenas">
      <p v-if="cargando" class="cargando">Cargando opiniones...</p>

      <div v-else-if="error" class="error-carga">
        <p>{{ error }}</p>
        <button type="button" @click="cargarResenas">Reintentar</button>
      </div>

      <template v-else>
        <article v-for="r in resenasBase" :key="r.id" class="resena">
          <p class="estrellas" :aria-label="r.estrellas + ' de 5 estrellas'">
            {{ '★'.repeat(r.estrellas) + '☆'.repeat(5 - r.estrellas) }}
          </p>
          <p>{{ r.comentario }}</p>
          <strong>{{ r.nombre }}</strong>
          <small>{{ r.servicio }}</small>
        </article>
      </template>
    </div>
  </section>
</template>