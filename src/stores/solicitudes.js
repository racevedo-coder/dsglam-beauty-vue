import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

const CLAVE = 'solicitudes'

function obtenerSolicitudes() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || []
  } catch {
    return []
  }
}

export const useSolicitudesStore = defineStore('solicitudes', () => {
  const solicitudes = ref(obtenerSolicitudes())

  watch(
    solicitudes,
    (lista) => {
      localStorage.setItem(CLAVE, JSON.stringify(lista))
    },
    { deep: true },
  )

  function guardar(datos) {
    const posicion = solicitudes.value.findIndex((s) => s.id === datos.id)
    if (posicion === -1) {
      solicitudes.value.push(datos)
    } else {
      solicitudes.value[posicion] = datos
    }
  }

  function eliminar(id) {
    solicitudes.value = solicitudes.value.filter((s) => s.id !== id)
  }

  return { solicitudes, guardar, eliminar }
})