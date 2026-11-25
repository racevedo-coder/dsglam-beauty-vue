import { createRouter, createWebHistory } from 'vue-router'
import paginasCss from '../assets/paginas.css?inline'
import HomeView from '../views/HomeView.vue'
import CatalogoView from '../views/CatalogoView.vue'
import DetalleView from '../views/DetalleView.vue'
import GaleriaView from '../views/GaleriaView.vue'
import QuienesSomosView from '../views/QuienesSomosView.vue'
import ContactoView from '../views/ContactoView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { bodyClass: 'inicio' } },
    { path: '/catalogo', name: 'catalogo', component: CatalogoView },
    { path: '/servicio/:id', name: 'detalle', component: DetalleView },
    { path: '/galeria', name: 'galeria', component: GaleriaView },
    { path: '/quienes-somos', name: 'quienes-somos', component: QuienesSomosView },
    { path: '/contacto', name: 'contacto', component: ContactoView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

let estiloPaginas = null

function usarEstilosPaginas(activar) {
  if (activar && !estiloPaginas) {
    estiloPaginas = document.createElement('style')
    estiloPaginas.textContent = paginasCss
    document.head.appendChild(estiloPaginas)
  } else if (!activar && estiloPaginas) {
    estiloPaginas.remove()
    estiloPaginas = null
  }
}

router.afterEach((to) => {
  document.body.className = to.meta.bodyClass || ''
  usarEstilosPaginas(to.name !== 'home')
})

export default router