<script setup>
import { reactive, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  abierta: Boolean,
})

const emit = defineEmits(['cerrar', 'publicar'])

const servicios = ['Maquillaje social', 'Diseño de cejas', 'Keratinas', 'Peinados', 'Otro']

const form = reactive({ nombre: '', servicio: '', estrellas: '', comentario: '' })
const errores = reactive({ nombre: '', servicio: '', estrellas: '', comentario: '' })
const validado = reactive({ nombre: false, servicio: false, estrellas: false, comentario: false })

const reglas = {
  nombre() {
    const valor = form.nombre.trim()
    if (valor === '') return 'Escribe tu nombre.'
    if (valor.length < 3) return 'Tu nombre debe tener mínimo 3 letras.'
    return ''
  },
  servicio() {
    return form.servicio === '' ? 'Elige el servicio.' : ''
  },
  estrellas() {
    return form.estrellas ? '' : 'Elige una calificación.'
  },
  comentario() {
    const largo = form.comentario.trim().length
    if (largo === 0) return 'Cuéntanos cómo te fue.'
    if (largo < 10) return 'Cuéntanos un poco más (mínimo 10 caracteres).'
    return ''
  },
}

function validar(campo) {
  errores[campo] = reglas[campo]()
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

function limpiar() {
  for (const campo of Object.keys(form)) {
    form[campo] = ''
    errores[campo] = ''
    validado[campo] = false
  }
}

function cerrar() {
  limpiar()
  emit('cerrar')
}

function enviar() {
  let todoBien = true

  for (const campo of Object.keys(reglas)) {
    if (!validar(campo)) {
      if (todoBien) {
        const id = campo === 'estrellas' ? 'e5' : 'op-' + campo
        document.getElementById(id).focus()
      }
      todoBien = false
    }
  }

  if (!todoBien) {
    return
  }

  emit('publicar', {
    nombre: form.nombre.trim(),
    servicio: form.servicio,
    estrellas: Number(form.estrellas),
    comentario: form.comentario.trim(),
  })
  cerrar()
}

watch(
  () => props.abierta,
  async (abierta) => {
    if (abierta) {
      await nextTick()
      document.getElementById('op-nombre').focus()
    }
  },
)

function alPresionarTecla(evento) {
  if (evento.key === 'Escape' && props.abierta) {
    cerrar()
  }
}

onMounted(() => document.addEventListener('keydown', alPresionarTecla))
onBeforeUnmount(() => document.removeEventListener('keydown', alPresionarTecla))
</script>

<template>
  <div id="fondo-opinion" class="fondo-opinion" :class="{ visible: abierta }" @click="cerrar"></div>

  <section id="ventana-opinion" class="ventana-opinion" :class="{ abierta: abierta }" aria-label="Escribir una opinión">
    <form id="form-opinion" novalidate @submit.prevent="enviar">
      <h3>Cuéntanos tu experiencia</h3>

      <label for="op-nombre">Nombre</label>
      <input
        type="text"
        id="op-nombre"
        v-model="form.nombre"
        required
        maxlength="40"
        placeholder="Laura Gómez"
        :class="clase('nombre')"
        @blur="validar('nombre')"
        @input="revalidar('nombre')"
      />
      <small class="error-campo" id="error-op-nombre">{{ errores.nombre }}</small>

      <label for="op-servicio">Servicio</label>
      <select
        id="op-servicio"
        v-model="form.servicio"
        required
        :class="clase('servicio')"
        @blur="validar('servicio')"
        @change="validar('servicio')"
      >
        <option value="">Elige un servicio</option>
        <option v-for="servicio in servicios" :key="servicio" :value="servicio">{{ servicio }}</option>
      </select>
      <small class="error-campo" id="error-op-servicio">{{ errores.servicio }}</small>

      <fieldset>
        <legend>Calificación</legend>
        <div class="estrellas-input" :class="clase('estrellas')">
          <template v-for="n in [5, 4, 3, 2, 1]" :key="n">
            <input
              type="radio"
              name="estrellas"
              :id="'e' + n"
              :value="n"
              v-model="form.estrellas"
              @change="validar('estrellas')"
            />
            <label :for="'e' + n" :title="n + (n === 1 ? ' estrella' : ' estrellas')">★</label>
          </template>
        </div>
      </fieldset>
      <small class="error-campo" id="error-op-estrellas">{{ errores.estrellas }}</small>

      <label for="op-comentario">Comentario</label>
      <textarea
        id="op-comentario"
        v-model="form.comentario"
        rows="3"
        required
        maxlength="200"
        placeholder="Cuéntanos cómo te fue"
        :class="clase('comentario')"
        @blur="validar('comentario')"
        @input="revalidar('comentario')"
      ></textarea>
      <small class="error-campo" id="error-op-comentario">{{ errores.comentario }}</small>

      <div class="acciones-opinion">
        <button type="button" id="cancelar-opinion" class="btn-secundario" @click="cerrar">Cancelar</button>
        <button type="submit" class="btn-principal">Publicar opinión</button>
      </div>
    </form>
  </section>
</template>