<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import DrawControls from './components/DrawControls.vue'
import DrawResult from './components/DrawResult.vue'
import ImportExportPanel from './components/ImportExportPanel.vue'
import MetricsPanel from './components/MetricsPanel.vue'
import ParticipantSelector from './components/ParticipantSelector.vue'
import PlayerForm from './components/PlayerForm.vue'
import PlayerList from './components/PlayerList.vue'
import { useMatchStore } from './stores/matchStore'
import type { PlayerFormInput } from './types/models'

const store = useMatchStore()

const editingPlayerId = ref<string | null>(null)
const formError = ref('')

const editingPlayer = computed(() => {
  if (!editingPlayerId.value) {
    return null
  }
  return store.players.find((player) => player.id === editingPlayerId.value) ?? null
})

const statusClass = computed(() => {
  if (!store.status) {
    return 'alert alert-info'
  }

  if (store.status.tone === 'error') {
    return 'alert alert-danger'
  }

  if (store.status.tone === 'warning') {
    return 'alert alert-warning'
  }

  if (store.status.tone === 'success') {
    return 'alert alert-success'
  }

  return 'alert alert-info'
})

onMounted(() => {
  store.hydratePlayers()
})

function handleSavePlayer(payload: PlayerFormInput) {
  formError.value = ''
  const ok = editingPlayerId.value
    ? store.updatePlayer(editingPlayerId.value, payload)
    : store.addPlayer(payload)

  if (ok) {
    editingPlayerId.value = null
    return
  }

  formError.value = store.status?.text ?? 'Nao foi possivel salvar o jogador.'
}

function handleEditPlayer(playerId: string) {
  editingPlayerId.value = playerId
  formError.value = ''
}

function handleCancelEdit() {
  editingPlayerId.value = null
  formError.value = ''
}

function handleRemovePlayer(playerId: string) {
  store.removePlayer(playerId)
  if (editingPlayerId.value === playerId) {
    editingPlayerId.value = null
  }
}

function handleExportJson() {
  const jsonContent = store.exportPlayers()
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'team-drawer-players.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

function handleImportJson(rawText: string) {
  store.importPlayersFromJson(rawText)
}
</script>

<template>
  <main class="container py-4 py-lg-5">
    <header class="mb-4">
      <h1 class="display-5 fw-bold mb-2">Team Drawer</h1>
      <p class="lead mb-0">Monte partidas casuais com sorteio equilibrado e compartilhamento rapido.</p>
    </header>

    <div v-if="store.status" :class="statusClass" role="status">
      {{ store.status.text }}
    </div>

    <PlayerForm :editing-player="editingPlayer" :submit-error="formError" @save="handleSavePlayer" @cancel="handleCancelEdit" />

    <div class="row g-3">
      <div class="col-12 col-lg-7">
        <PlayerList :players="store.players" @edit="handleEditPlayer" @remove="handleRemovePlayer" />
        <ParticipantSelector
          :players="store.players"
          :selected-ids="store.selectedPlayerIds"
          @toggle="store.toggleParticipant"
          @select-all="store.selectAllParticipants"
          @clear="store.clearParticipants"
        />
      </div>

      <div class="col-12 col-lg-5">
        <DrawControls
          :selected-count="store.selectedPlayerIds.length"
          :can-draw="store.canDraw"
          :has-result="!!store.drawResult"
          @draw="store.runDraw"
          @reroll="store.reroll"
          @copy="store.copyDrawResult"
        />
        <MetricsPanel :result="store.drawResult" />
      </div>
    </div>

    <DrawResult :result="store.drawResult" />

    <ImportExportPanel
      :import-report="store.importReport"
      :manual-copy-text="store.manualCopyText"
      @export-json="handleExportJson"
      @import-json="handleImportJson"
    />
  </main>
</template>
