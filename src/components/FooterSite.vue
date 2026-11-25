<script setup>
import { RouterLink } from 'vue-router'

function subir() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <aside aria-label="Accesos rápidos">
    <a href="https://wa.link/yz34tq" target="_blank" rel="noopener noreferrer">
      <img src="/img/whatsapp.png" alt="WhatsApp" width="30" height="30" />
    </a>

    <a
      href="https://www.instagram.com/dsglambeauty2025?exln=bGxveWJzOHVlc3Vj"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="/img/instagram.png" alt="Instagram" width="30" height="30" />
    </a>

    <a href="#top" aria-label="Volver arriba" @click.prevent="subir">
      <i class="fa-solid fa-angles-up" aria-hidden="true"></i>
    </a>
  </aside>

  <footer class="footer">
    <section>
      <h2>DsGlam-Beauty</h2>
      <p>Salón de Belleza</p>
    </section>

    <section>
      <h3>Síguenos</h3>
      <a
        href="https://www.instagram.com/dsglambeauty2025?exln=bGxveWJzOHVlc3Vj"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="fa-brands fa-instagram" aria-hidden="true"></i> dsglambeauty2025
      </a>
    </section>

    <section>
      <h3>Contacto</h3>
      <address>
        <a href="tel:+573011152564">
          <i class="fa-solid fa-phone" aria-hidden="true"></i> 301 115 2564
        </a>
      </address>
    </section>

    <nav aria-label="Soporte">
      <h3>Soporte</h3>
      <ul>
        <li><RouterLink to="/catalogo">Catálogo</RouterLink></li>
        <li><RouterLink to="/quienes-somos">¿Quiénes somos?</RouterLink></li>
        <li><RouterLink to="/galeria">Galería</RouterLink></li>
        <li><RouterLink to="/contacto">Contacto</RouterLink></li>
      </ul>
    </nav>

    <small>Copyright © 2026 DsGlam-Beauty. Todos los derechos reservados.</small>
  </footer>
</template>