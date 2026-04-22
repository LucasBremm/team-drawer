<script setup lang="ts">
import type { Player } from '../types/models'

defineProps<{
  players: Player[]
  selectedIds: string[]
}>()

const emit = defineEmits<{
  toggle: [playerId: string]
  selectAll: []
  clear: []
}>()
</script>

<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h2 class="h5 mb-0">Participantes da partida</h2>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="emit('selectAll')">Marcar todos</button>
          <button type="button" class="btn btn-sm btn-outline-secondary" @click="emit('clear')">Limpar selecao</button>
        </div>
      </div>

      <div v-if="!players.length" class="alert alert-light border mb-0">
        Cadastre jogadores para iniciar a selecao.
      </div>

      <div v-else class="row g-2">
        <div v-for="player in players" :key="player.id" class="col-12 col-md-6 col-lg-4">
          <label class="form-check border rounded p-2 d-flex justify-content-between align-items-center">
            <span>
              <span class="d-block fw-semibold">{{ player.name }}</span>
              <span class="small-muted">{{ player.position }} • N{{ player.skillLevel }}</span>
            </span>
            <input
              class="form-check-input"
              type="checkbox"
              :checked="selectedIds.includes(player.id)"
              :aria-label="`Selecionar ${player.name}`"
              @change="emit('toggle', player.id)"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
