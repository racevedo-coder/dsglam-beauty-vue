<script setup>
import { ref, computed } from 'vue'

const categorias = ['Todos', 'Maquillaje', 'Peinados', 'Cejas y pestañas', 'Tratamientos capilares']

const fotos = [
  { img: '/img/galeria1.jpg', alt: 'Maquillaje social profesional', texto: 'Maquillaje social', categoria: 'Maquillaje' },
  { img: '/img/galeria2.webp', alt: 'Maquillaje artistico', texto: 'Maquillaje artistico', categoria: 'Maquillaje' },
  { img: '/img/galeria3..jpeg', alt: 'Planchado profesional de cabello', texto: 'Planchado y ondas', categoria: 'Tratamientos capilares' },
  { img: '/img/galeria4.jpg', alt: 'Cejas semipermanentes', texto: 'Cejas semi', categoria: 'Cejas y pestañas' },
  { img: '/img/galeria5.webp', alt: 'Maquillaje de noche con colores vibrantes', texto: 'Maquillaje noche', categoria: 'Maquillaje' },
  { img: '/img/galeria6.jpg', alt: 'Peinado social elegante', texto: 'Peinado social', categoria: 'Peinados' },
  { img: '/img/galeria8.jpeg', alt: 'Alisado profesional de cabello', texto: 'Alisado', categoria: 'Tratamientos capilares' },
  { img: '/img/lifting.jpeg', alt: 'Lifting y rizado de pestañas', texto: 'Lifting de pestañas', categoria: 'Cejas y pestañas' },
  { img: '/img/peinadoinfantl.jpeg', alt: 'Peinado infantil con trenzas y accesorios', texto: 'Peinado infantil', categoria: 'Peinados' },
  { img: '/img/catalogo3.jpeg', alt: 'Maquillaje y peinado para eventos y fiestas', texto: 'Maquillaje artístico', categoria: 'Maquillaje' },
  { img: '/img/planchado.jpeg', alt: 'Tratamiento y planchado capilar profesional', texto: 'Keratina', categoria: 'Tratamientos capilares' },
  { img: '/img/detalle3.jpg', alt: 'Extensiones de pestañas punto a punto', texto: 'Pestañas punto a punto', categoria: 'Cejas y pestañas' },
  { img: '/img/catalogo6.jpg', alt: 'Maquillaje social con acabado profesional', texto: 'Peinados recogidos', categoria: 'Peinados' },
  { img: '/img/catalogo5.jpeg', alt: 'Maquillaje social con acabado profesional', texto: 'Maquillaje artístico-Infantil', categoria: 'Maquillaje' },
]

function leerFiltro() {
  const guardado = sessionStorage.getItem('filtroGaleria')
  return categorias.includes(guardado) ? guardado : 'Todos'
}

const categoriaActiva = ref(leerFiltro())

function elegir(categoria) {
  categoriaActiva.value = categoria
  sessionStorage.setItem('filtroGaleria', categoria)
}

const fotosFiltradas = computed(() => {
  if (categoriaActiva.value === 'Todos') {
    return fotos
  }
  return fotos.filter((f) => f.categoria === categoriaActiva.value)
})
</script>

<template>
  <section class="sectiongaleria">
    <div>
      <h1>Galería de trabajos</h1>
      <p>Mira algunos de nuestros trabajos reales.</p>
    </div>

    <nav class="nav-galeria" aria-label="Categorías de la galería">
      <ul>
        <li v-for="categoria in categorias" :key="categoria">
          <a href="#" :class="{ activo: categoria === categoriaActiva }" @click.prevent="elegir(categoria)">
            {{ categoria }}
          </a>
        </li>
      </ul>
    </nav>
  </section>

  <main aria-label="Galeria de trabajos">
    <section
      class="sectiongaleria-page"
      :class="{ filtrado: categoriaActiva !== 'Todos' }"
      aria-label="Trabajos destacados"
    >
      <figure v-for="foto in fotosFiltradas" :key="foto.img">
        <img :src="foto.img" :alt="foto.alt" loading="lazy" />
        <figcaption>{{ foto.texto }}</figcaption>
      </figure>
    </section>
  </main>
</template>