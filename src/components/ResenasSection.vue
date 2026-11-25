<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import OpinionModal from './OpinionModal.vue'

const CLAVE_RESENAS = 'resenasNuevas'

function obtenerNuevas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_RESENAS)) || []
  } catch {
    return []
  }
}

const resenasBase = ref([])
const nuevas = ref(obtenerNuevas())
const cargando = ref(true)
const error = ref('')
const modalAbierta = ref(false)

const todas = computed(() => [...nuevas.value, ...resenasBase.value])

watch(
  nuevas,
  (lista) => {
    localStorage.setItem(CLAVE_RESENAS, JSON.stringify(lista))
  },
  { deep: true },
)

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

function agregarResena(datos) {
  nuevas.value.unshift({ id: Date.now(), ...datos, propia: true })
}

function eliminarResena(id) {
  if (!confirm('¿Quieres eliminar tu opinión?')) {
    return
  }
  nuevas.value = nuevas.value.filter((n) => n.id !== id)
}

onMounted(cargarResenas)
</script>

<template>
  <section class="sectionresenas" id="opiniones" aria-label="Opiniones de clientas">
    <h2>Lo que dicen nuestras clientas</h2>
    <button type="button" id="abrir-opinion" class="btn-ver" @click="modalAbierta = true">
      Escribir una opinión
    </button>

    <div id="resenas" class="resenas">
      <p v-if="cargando" class="cargando">Cargando opiniones...</p>

      <div v-else-if="error" class="error-carga">
        <p>{{ error }}</p>
        <button type="button" @click="cargarResenas">Reintentar</button>
      </div>

      <template v-else>
        <article v-for="r in todas" :key="r.id" class="resena">
          <p class="estrellas" :aria-label="r.estrellas + ' de 5 estrellas'">
            {{ '★'.repeat(r.estrellas) + '☆'.repeat(5 - r.estrellas) }}
          </p>
          <p>{{ r.comentario }}</p>
          <strong>{{ r.nombre }}</strong>
          <small>{{ r.servicio }}</small>
          <button v-if="r.propia" type="button" class="btn-borrar" @click="eliminarResena(r.id)">
            Eliminar mi opinión
          </button>
        </article>
      </template>
    </div>
  </section>

  <OpinionModal :abierta="modalAbierta" @cerrar="modalAbierta = false" @publicar="agregarResena" />
</template>