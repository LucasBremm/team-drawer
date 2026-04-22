<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Player, PlayerFormInput } from '../types/models'
import { PLAYER_POSITIONS } from '../types/models'

const props = defineProps<{
  editingPlayer: Player | null
  submitError: string
}>()

const emit = defineEmits<{
  save: [payload: PlayerFormInput]
  cancel: []
}>()

const name = ref('')
const position = ref('')
const skillLevel = ref<number | string>(5)

const isEditing = computed(() => !!props.editingPlayer)

watch(
  () => props.editingPlayer,
  (player) => {
    if (!player) {
      name.value = ''
      position.value = ''
      skillLevel.value = 5
      return
    }

    name.value = player.name
    position.value = player.position
    skillLevel.value = player.skillLevel
  },
  { immediate: true },
)

function submitForm() {
  emit('save', {
    name: name.value,
    position: position.value,
    skillLevel: skillLevel.value,
  })
}
</script>

<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0">{{ isEditing ? 'Editar jogador' : 'Cadastrar jogador' }}</h2>
        <span class="small-muted">Nome, posicao e habilidade sao obrigatorios</span>
      </div>

      <form class="row g-3" @submit.prevent="submitForm">
        <div class="col-12 col-md-5">
          <label for="player-name" class="form-label">Nome</label>
          <input id="player-name" v-model="name" class="form-control" type="text" maxlength="60" required />
        </div>

        <div class="col-12 col-md-4">
          <label for="player-position" class="form-label">Posicao</label>
          <select id="player-position" v-model="position" class="form-select" required>
            <option value="" disabled>Selecione</option>
            <option v-for="value in PLAYER_POSITIONS" :key="value" :value="value">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="col-12 col-md-3">
          <label for="player-skill" class="form-label">Habilidade (1-10)</label>
          <input id="player-skill" v-model.number="skillLevel" class="form-control" type="number" min="1" max="10" step="1" required />
        </div>

        <div class="col-12 d-flex gap-2">
          <button type="submit" class="btn btn-success">{{ isEditing ? 'Salvar edicao' : 'Adicionar jogador' }}</button>
          <button v-if="isEditing" type="button" class="btn btn-outline-secondary" @click="emit('cancel')">
            Cancelar edicao
          </button>
        </div>
      </form>

      <p v-if="submitError" class="status-error mt-3 mb-0">{{ submitError }}</p>
    </div>
  </div>
</template>
