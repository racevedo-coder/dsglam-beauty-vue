<script setup>
const razones = [
  { titulo: 'Experiencia', texto: 'Años perfeccionando cada técnica.' },
  { titulo: 'Técnica', texto: 'No se replican técnicas, cada servicio parte del estudio del rostro.' },
  { titulo: 'Cercanía', texto: 'Cada cliente decide cómo verse, no al revés.' },
]
</script>

<template>
  <main class="main">
    <section class="sectionquienessomos">
      <h1>¿Quiénes somos?</h1>
    </section>

    <section class="sectiontrabajo" aria-labelledby="titulo-trabajo">
      <img class="ds" src="/img/ds.png" alt="" width="120" height="120" />

      <article>
        <h2 id="titulo-trabajo">Cómo trabajamos</h2>
        <p>
          <strong>DsGlam-Beauty</strong> nació de la idea de que un buen maquillaje no cubre, sino que revela.
          Trabajamos con productos profesionales y una técnica pensada para cada tipo de rostro.
        </p>
      </article>

      <figure>
        <img src="/img/quienessomos1.png" alt="espacio de trabajo 1" width="300" height="400" loading="lazy" />
      </figure>

      <figure>
        <img src="/img/quienessomos2.jpeg" alt="espacio de trabajo 2" width="300" height="400" loading="lazy" />
      </figure>
    </section>

    <section class="sectionelegirnos" aria-labelledby="titulo-elegirnos">
      <h2 id="titulo-elegirnos">¿Por qué elegirnos?</h2>

      <article v-for="razon in razones" :key="razon.titulo">
        <h3>{{ razon.titulo }}</h3>
        <p>{{ razon.texto }}</p>
      </article>
    </section>
  </main>
</template>