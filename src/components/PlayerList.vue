<script setup lang="ts">
import type { Player } from '../types/models'

defineProps<{
  players: Player[]
}>()

const emit = defineEmits<{
  edit: [playerId: string]
  remove: [playerId: string]
}>()
</script>

<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h5 mb-0">Jogadores cadastrados</h2>
        <span class="small-muted">Total: {{ players.length }}</span>
      </div>

      <div v-if="!players.length" class="alert alert-light border mb-0">Nenhum jogador cadastrado ainda.</div>

      <div v-else class="table-responsive">
        <table class="table table-sm align-middle mb-0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Posicao</th>
              <th>Habilidade</th>
              <th class="text-end">Acoes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="player in players" :key="player.id">
              <td>{{ player.name }}</td>
              <td>{{ player.position }}</td>
              <td>{{ player.skillLevel }}</td>
              <td class="text-end">
                <div class="btn-group btn-group-sm" role="group" aria-label="Acoes de jogador">
                  <button class="btn btn-outline-secondary" type="button" @click="emit('edit', player.id)">Editar</button>
                  <button class="btn btn-outline-danger" type="button" @click="emit('remove', player.id)">Remover</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
