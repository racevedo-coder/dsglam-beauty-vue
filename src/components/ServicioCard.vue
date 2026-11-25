<script setup>
defineProps({
  servicio: { type: Object, required: true },
})
</script>

<template>
  <article>
    <img :src="'/' + servicio.imagen" :alt="servicio.nombre" width="150" height="100" />
    <div>
      <h3>{{ servicio.nombre }}</h3>
      <p>{{ servicio.precio }}</p>
      <RouterLink :to="{ name: 'detalle', params: { id: servicio.id } }" class="btn-detalle">
        Ver detalle &rarr;
      </RouterLink>
    </div>
  </article>
</template>