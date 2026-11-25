<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const servicios = [
  { id: 1, nombre: 'Maquillaje social día', precio: '$ 40.000', img: '/img/inicio1...jpeg', alt: 'Maquillaje social día' },
  { id: 2, nombre: 'Diseño de Cejas-Semi', precio: '$ 15.000', img: '/img/inicio2.webp', alt: 'Diseño de Cejas-Semipermanente' },
  { id: 3, nombre: 'Keratinas', precio: '$ 130.000', img: '/img/inicio3...jpg', alt: 'Keratinas' },
]

const galeria = [
  { img: '/img/inicio4.webp', alt: 'Maquillaje artístico' },
  { img: '/img/inicio5.webp', alt: 'Maquillaje social 1' },
  { img: '/img/inicio6.webp', alt: 'Maquillaje social 2' },
]

const carrusel = ref(null)
let instanciaCarrusel = null

onMounted(() => {
  if (window.bootstrap) {
    instanciaCarrusel = window.bootstrap.Carousel.getOrCreateInstance(carrusel.value)
  }
})

onBeforeUnmount(() => {
  if (instanciaCarrusel) {
    instanciaCarrusel.dispose()
  }
})
</script>

<template>
  <section class="hero">
    <div class="hero-texto">
      <p class="etiqueta">Salón de belleza</p>
      <p class="lema">"Resaltando la mejor versión de ti misma"</p>
      <p class="subtitulo">Maquillaje, cejas, keratinas y más. Escríbenos y agenda tu cita.</p>
      <div class="hero-botones">
        <a class="boton" href="https://wa.link/yz34tq" target="_blank" rel="noopener noreferrer">Reserva tu cita</a>
        <RouterLink class="boton boton-borde" to="/catalogo">Ver servicios</RouterLink>
      </div>
    </div>

    <div
      id="carruselInicio"
      ref="carrusel"
      class="carousel slide carousel-fade hero-carousel"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      data-bs-pause="false"
    >
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carruselInicio" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Imagen 1"></button>
        <button type="button" data-bs-target="#carruselInicio" data-bs-slide-to="1" aria-label="Imagen 2"></button>
        <button type="button" data-bs-target="#carruselInicio" data-bs-slide-to="2" aria-label="Imagen 3"></button>
      </div>

      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/img/iniciooo.jpg" class="d-block w-100" alt="Maquillaje profesional con delineado plateado y rubor rosado realizado en DsGlam-Beauty" width="450" height="380" />
        </div>
        <div class="carousel-item">
          <img src="/img/iniciooo3.jpg" class="d-block w-100" alt="Peinados y servicios estéticos en DsGlam-Beauty" width="450" height="380" />
        </div>
        <div class="carousel-item">
          <img src="/img/iniciooo2.jpg" class="d-block w-100" alt="Maquillaje y cuidado personal en DsGlam-Beauty" width="450" height="380" />
        </div>
      </div>
    </div>
  </section>

  <main class="main">
    <section class="sectionservicios">
      <div>
        <h2>Nuestros servicios</h2>
        <RouterLink to="/catalogo">Ver todos los servicios</RouterLink>
      </div>
      <article v-for="servicio in servicios" :key="servicio.id">
        <img :src="servicio.img" :alt="servicio.alt" width="150" height="100" />
        <div>
          <h3>{{ servicio.nombre }}</h3>
          <p>{{ servicio.precio }}</p>
          <RouterLink :to="{ name: 'detalle', params: { id: servicio.id } }" class="ver-detalle">
            Ver detalle &rarr;
          </RouterLink>
        </div>
      </article>
    </section>

    <section class="sectiongaleria">
      <div>
        <h2>Galería de trabajos</h2>
        <RouterLink to="/galeria">Ver toda la galería</RouterLink>
      </div>
      <figure v-for="foto in galeria" :key="foto.img">
        <img :src="foto.img" :alt="foto.alt" width="150" height="100" />
      </figure>
    </section>

    <section class="porque">
      <h2>¿Por qué elegirnos?</h2>
      <ul>
        <li>
          <i class="fa-solid fa-heart" aria-hidden="true"></i>
          <h3>Atención personalizada</h3>
          <p>Cada servicio se adapta a tu rostro y a lo que buscas.</p>
        </li>
        <li>
          <i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
          <h3>Variedad de servicios</h3>
          <p>Maquillaje, cejas, keratinas y más en un solo lugar.</p>
        </li>
        <li>
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
          <h3>Agenda por WhatsApp</h3>
          <p>Escríbenos y reserva tu cita en pocos minutos.</p>
        </li>
        <li>
          <i class="fa-regular fa-images" aria-hidden="true"></i>
          <h3>Resultados que se ven</h3>
          <p>Mira nuestros trabajos reales en la galería.</p>
        </li>
      </ul>
    </section>

    <section class="sectionresenas" id="opiniones" aria-label="Opiniones de clientas">
      <h2>Lo que dicen nuestras clientas</h2>
    </section>
  </main>
</template>