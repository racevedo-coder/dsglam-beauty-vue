<script setup>
import { computed } from 'vue'

const props = defineProps({
  solicitud: { type: Object, required: true },
  esNueva: Boolean,
})

defineEmits(['editar', 'quitar', 'aceptar'])

const fechaFormateada = computed(() => {
  const [anio, mes, dia] = props.solicitud.fecha.split('-')
  return `${dia}/${mes}/${anio}`
})
</script>

<template>
  <article class="solicitud">
    <h2 v-if="esNueva">¡Solicitud enviada!</h2>
    <h3>{{ solicitud.nombre }}</h3>

    <ul class="detalle">
      <li><strong>Teléfono: </strong>{{ solicitud.telefono }}</li>
      <li><strong>Correo: </strong>{{ solicitud.correo }}</li>
      <li><strong>Fecha: </strong>{{ fechaFormateada }}</li>
      <li><strong>Mensaje: </strong>{{ solicitud.mensaje }}</li>
    </ul>

    <button v-if="esNueva" type="button" class="btn-editar" @click="$emit('editar', solicitud)">Editar</button>
    <button type="button" class="btn-quitar" @click="$emit('quitar', solicitud)">Cancelar solicitud</button>
    <button v-if="esNueva" type="button" class="btn-aceptar" @click="$emit('aceptar')">Aceptar</button>
  </article>
</template>