import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useServiciosStore = defineStore('servicios', () => {
  const servicios = ref([])
  const cargando = ref(false)
  const error = ref('')

  async function cargar() {
    if (servicios.value.length > 0 || cargando.value) {
      return
    }

    cargando.value = true
    error.value = ''

    try {
      const respuesta = await fetch('/servicios.json')

      if (!respuesta.ok) {
        const fallo = new Error('Error HTTP')
        fallo.estado = respuesta.status
        throw fallo
      }

      servicios.value = await respuesta.json()
    } catch (e) {
      if (e.estado === 404) {
        error.value = 'No encontramos los servicios (error 404).'
      } else if (e.estado >= 500) {
        error.value = 'El servidor tiene problemas, intenta más tarde (error ' + e.estado + ').'
      } else if (e.estado) {
        error.value = 'No se pudieron cargar los servicios (error ' + e.estado + ').'
      } else {
        error.value = 'Revisa tu conexión a internet e intenta de nuevo.'
      }
    } finally {
      cargando.value = false
    }
  }

  function porId(id) {
    return servicios.value.find((s) => s.id === Number(id))
  }

  return { servicios, cargando, error, cargar, porId }
})