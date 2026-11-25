<script setup>
import { ref, reactive, computed } from 'vue'
import { useSolicitudesStore } from '../stores/solicitudes'
import SolicitudCard from '../components/SolicitudCard.vue'

const store = useSolicitudesStore()

const form = reactive({ nombre: '', telefono: '', correo: '', fecha: '', mensaje: '' })
const errores = reactive({ nombre: '', telefono: '', correo: '', fecha: '', mensaje: '' })
const validado = reactive({ nombre: false, telefono: false, correo: false, fecha: false, mensaje: false })

const editando = ref(null)
const panelAbierto = ref(false)
const modoPanel = ref('lista')
const ultima = ref(null)

const hayModal = computed(() => panelAbierto.value || editando.value !== null)

const reglas = {
  nombre(valor) {
    if (valor.trim() === '') return 'Escribe tu nombre.'
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,70}$/.test(valor.trim())) {
      return 'Solo letras, entre 3 y 70 caracteres.'
    }
    return ''
  },
  telefono(valor) {
    if (valor.trim() === '') return 'Escribe tu teléfono.'
    if (!/^3[0-9]{9}$/.test(valor.trim())) {
      return 'Debe empezar por 3 y tener 10 dígitos.'
    }
    return ''
  },
  correo(valor) {
    if (valor.trim() === '') return 'Escribe tu correo.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())) {
      return 'Escribe un correo válido, por ejemplo laura@gmail.com.'
    }
    return ''
  },
  fecha(valor) {
    if (valor === '') return 'Elige la fecha de tu cita.'
    const hoy = new Date()
    const hoyTexto =
      hoy.getFullYear() +
      '-' +
      String(hoy.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(hoy.getDate()).padStart(2, '0')
    if (valor < hoyTexto) return 'La fecha no puede ser anterior a hoy.'
    if (valor > '2026-12-31') return 'Solo agendamos hasta el 31/12/2026.'
    return ''
  },
  mensaje(valor) {
    const largo = valor.trim().length
    if (largo < 10) return 'Cuéntanos un poco más (mínimo 10 caracteres).'
    if (largo > 500) return 'El mensaje no puede pasar de 500 caracteres.'
    return ''
  },
}

function validar(campo) {
  errores[campo] = reglas[campo](form[campo])
  validado[campo] = true
  return errores[campo] === ''
}

function revalidar(campo) {
  if (validado[campo]) {
    validar(campo)
  }
}

function clase(campo) {
  return {
    invalido: validado[campo] && errores[campo] !== '',
    valido: validado[campo] && errores[campo] === '',
  }
}

function limpiarFormulario() {
  for (const campo of Object.keys(form)) {
    form[campo] = ''
    errores[campo] = ''
    validado[campo] = false
  }
}

function cerrarEdicion() {
  editando.value = null
  limpiarFormulario()
}

function cerrarPanel() {
  panelAbierto.value = false
}

function cerrarTodo() {
  cerrarEdicion()
  cerrarPanel()
}

function enviar() {
  let todoBien = true

  for (const campo of Object.keys(reglas)) {
    if (!validar(campo)) {
      if (todoBien) {
        document.getElementById(campo).focus()
      }
      todoBien = false
    }
  }

  if (!todoBien) {
    return
  }

  const datos = {
    id: editando.value ? editando.value.id : Date.now(),
    nombre: form.nombre,
    telefono: form.telefono,
    correo: form.correo,
    fecha: form.fecha,
    mensaje: form.mensaje,
  }

  store.guardar(datos)
  cerrarEdicion()
  ultima.value = datos
  modoPanel.value = 'nueva'
  panelAbierto.value = true
}

function editar(solicitud) {
  Object.assign(form, {
    nombre: solicitud.nombre,
    telefono: solicitud.telefono,
    correo: solicitud.correo,
    fecha: solicitud.fecha,
    mensaje: solicitud.mensaje,
  })
  editando.value = solicitud
  cerrarPanel()
}

function quitar(solicitud) {
  if (!confirm('¿Seguro que quieres cancelar esta solicitud?')) {
    return
  }
  store.eliminar(solicitud.id)
  if (modoPanel.value === 'nueva' || store.solicitudes.length === 0) {
    cerrarPanel()
  }
}

function verSolicitudes() {
  if (store.solicitudes.length === 0) {
    alert('Aún no tienes solicitudes guardadas.')
    return
  }
  modoPanel.value = 'lista'
  panelAbierto.value = true
}
</script>

<template>
  <div id="fondo-modal" :class="{ visible: hayModal }" @click="cerrarTodo"></div>

  <main class="maincontacto">
    <section class="sectioncontacto">
      <h1>Contáctanos</h1>
      <p>Agenda tu cita o resuelve tus dudas, aquí te escuchamos</p>
      <button type="button" id="ver-solicitudes" class="btn-ver" @click="verSolicitudes">
        <i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Mis solicitudes
      </button>
    </section>

    <div class="contacto-wrapper">
      <section
        class="sectionformulario"
        :class="{ 'modo-edicion': editando !== null }"
        aria-label="Formulario de contacto"
      >
        <form novalidate aria-label="Formulario de contacto" @submit.prevent="enviar">
          <div class="form-row">
            <div class="campo-grupo">
              <label for="nombre">Nombre</label>
              <div class="input-icono" :class="clase('nombre')">
                <i class="fa-regular fa-user" aria-hidden="true"></i>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  v-model="form.nombre"
                  required
                  minlength="3"
                  maxlength="70"
                  pattern="[A-Za-zÁÉÍÓÚáéíóúÑñ ]{3,70}"
                  placeholder="Laura Gómez"
                  title="Solo letras, entre 3 y 70 caracteres"
                  aria-describedby="error-nombre"
                  @blur="validar('nombre')"
                  @input="revalidar('nombre')"
                />
              </div>
              <small id="error-nombre" class="error-campo" aria-live="polite">{{ errores.nombre }}</small>
            </div>

            <div class="campo-grupo">
              <label for="telefono">Teléfono</label>
              <div class="input-icono" :class="clase('telefono')">
                <i class="fa-solid fa-phone" aria-hidden="true"></i>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  v-model="form.telefono"
                  required
                  pattern="3[0-9]{9}"
                  placeholder="3005711806"
                  title="Por favor, ingresa un número de teléfono válido. Debe comenzar con 3 y tener 10 dígitos"
                  aria-describedby="error-telefono"
                  @blur="validar('telefono')"
                  @input="revalidar('telefono')"
                />
              </div>
              <small id="error-telefono" class="error-campo" aria-live="polite">{{ errores.telefono }}</small>
            </div>
          </div>

          <div class="campo-grupo">
            <label for="correo">Correo electrónico</label>
            <div class="input-icono" :class="clase('correo')">
              <i class="fa-regular fa-envelope" aria-hidden="true"></i>
              <input
                type="email"
                id="correo"
                name="correo"
                v-model="form.correo"
                required
                placeholder="laura123@gmail.com"
                title="Por favor, ingresa un correo electrónico válido"
                aria-describedby="error-correo"
                @blur="validar('correo')"
                @input="revalidar('correo')"
              />
            </div>
            <small id="error-correo" class="error-campo" aria-live="polite">{{ errores.correo }}</small>
          </div>

          <div class="campo-grupo">
            <label for="fecha">Fecha deseada para la cita</label>
            <div class="input-icono" :class="clase('fecha')">
              <i class="fa-regular fa-calendar" aria-hidden="true"></i>
              <input
                type="date"
                id="fecha"
                name="fecha"
                v-model="form.fecha"
                required
                min="2026-10-14"
                max="2026-12-31"
                placeholder="dd/mm/aaaa"
                aria-describedby="error-fecha"
                @blur="validar('fecha')"
                @input="revalidar('fecha')"
                @change="validar('fecha')"
              />
            </div>
            <small id="error-fecha" class="error-campo" aria-live="polite">{{ errores.fecha }}</small>
          </div>

          <div class="campo-grupo">
            <label for="mensaje">Mensaje</label>
            <div class="input-icono textarea-icono" :class="clase('mensaje')">
              <i class="fa-regular fa-comment-dots" aria-hidden="true"></i>
              <textarea
                id="mensaje"
                name="mensaje"
                v-model="form.mensaje"
                rows="4"
                required
                minlength="10"
                maxlength="500"
                placeholder="Cuéntanos qué servicio te interesa"
                aria-describedby="error-mensaje"
                @blur="validar('mensaje')"
                @input="revalidar('mensaje')"
              ></textarea>
            </div>
            <small id="error-mensaje" class="error-campo" aria-live="polite">{{ errores.mensaje }}</small>
            <small id="contador" class="contador" :class="{ limite: form.mensaje.length >= 450 }" aria-live="polite">
              {{ form.mensaje.length }}/500
            </small>
          </div>

          <button type="submit" class="btn-enviar">
            <i class="fa-regular fa-paper-plane" aria-hidden="true"></i>
            {{ editando ? 'Guardar cambios' : 'Enviar mensaje' }}
          </button>
          <button type="button" class="btn-cancelar" @click="cerrarEdicion">Cancelar</button>
        </form>
      </section>

      <div class="contacto-col-derecha">
        <section class="sectionmapa" aria-label="Ubicación de DsGlam-Beauty">
          <h2>Encuéntranos aquí</h2>
          <div class="mapa-contenedor">
            <div class="tarjeta-mapa">
              <h3>DsGlam-Beauty</h3>
              <p>Calle 20 carrera 1k-51, Sahagún</p>
              <a
                href="https://maps.google.com/?q=Cl.+20+%231K-51,+Sahag%C3%BAn,+C%C3%B3rdoba"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Abrir en Maps
              </a>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d985.2928821644541!2d-75.44864791253767!3d8.956337099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5963c4e2b20c4b%3A0x84f1c4f84e57e3b6!2zQ2wuIDIwICMgMUstNTEsIFNhaGFnw7puLCBDw7NyZG9iYQ!5e0!3m2!1ses!2sco!4v1791894151842!5m2!1ses!2sco"
              title="Mapa con la ubicación de DsGlam-Beauty"
              width="330"
              height="195"
              loading="lazy"
              allowfullscreen
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </section>

        <section class="sectiondatos" aria-label="Datos de contacto">
          <address>
            <div class="datos-grid">
              <div class="dato-card">
                <div class="dato-icono">
                  <i class="fa-solid fa-phone" aria-hidden="true"></i>
                </div>
                <div class="dato-info">
                  <h3>Teléfono</h3>
                  <a href="tel:+573011152564">301 115 2564</a>
                </div>
              </div>

              <div class="dato-card">
                <div class="dato-icono">
                  <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
                </div>
                <div class="dato-info">
                  <h3>WhatsApp</h3>
                  <a href="https://wa.link/yz34tq" target="_blank" rel="noopener noreferrer">301 115 2564</a>
                </div>
              </div>

              <div class="dato-card">
                <div class="dato-icono">
                  <i class="fa-regular fa-clock" aria-hidden="true"></i>
                </div>
                <div class="dato-info">
                  <h3>Horarios</h3>
                  <p>Lunes a domingo<br />7-12 am · 2-10 pm</p>
                </div>
              </div>

              <div class="dato-card">
                <div class="dato-icono">
                  <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                </div>
                <div class="dato-info">
                  <h3>Dirección</h3>
                  <p>Calle 20 cra 1k-51<br />Sahagún, Córdoba</p>
                </div>
              </div>
            </div>
          </address>
        </section>
      </div>
    </div>

    <section id="lista-solicitudes" :class="{ abierta: panelAbierto }" aria-label="Solicitudes enviadas">
      <SolicitudCard
        v-if="modoPanel === 'nueva' && ultima"
        :solicitud="ultima"
        es-nueva
        @editar="editar"
        @quitar="quitar"
        @aceptar="cerrarPanel"
      />

      <template v-else>
        <button type="button" class="btn-x" aria-label="Cerrar solicitudes" @click="cerrarPanel">×</button>
        <p class="nota-local">Estas solicitudes se guardan solo en este dispositivo.</p>
        <SolicitudCard v-for="s in store.solicitudes" :key="s.id" :solicitud="s" @quitar="quitar" />
      </template>
    </section>
  </main>
</template>