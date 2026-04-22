<script setup lang="ts">
import { ref } from 'vue'
import type { ImportReport } from '../types/models'

defineProps<{
  importReport: ImportReport | null
  manualCopyText: string
}>()

const emit = defineEmits<{
  exportJson: []
  importJson: [rawText: string]
}>()

const importText = ref('')
const isReadingFile = ref(false)

function runImportFromText() {
  emit('importJson', importText.value)
}

async function handleFileSelection(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) {
    return
  }

  isReadingFile.value = true
  try {
    const text = await file.text()
    emit('importJson', text)
  } finally {
    isReadingFile.value = false
    input.value = ''
  }
}
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h2 class="h5 mb-3">Importacao e exportacao</h2>

      <div class="d-flex flex-wrap gap-2 mb-3">
        <button type="button" class="btn btn-outline-primary" @click="emit('exportJson')">Exportar cadastro em JSON</button>
        <label class="btn btn-outline-secondary mb-0">
          {{ isReadingFile ? 'Lendo arquivo...' : 'Importar arquivo JSON' }}
          <input type="file" accept="application/json" class="d-none" @change="handleFileSelection" />
        </label>
      </div>

      <label for="import-text" class="form-label">Ou cole o JSON manualmente</label>
      <textarea
        id="import-text"
        v-model="importText"
        class="form-control mb-2"
        rows="6"
        placeholder='{"players": [{"name": "Ana", "position": "Meio", "skillLevel": 7}]}'
      ></textarea>
      <button type="button" class="btn btn-secondary mb-3" @click="runImportFromText">Importar texto</button>

      <div v-if="importReport" class="alert alert-light border">
        <p class="mb-1"><strong>Importados:</strong> {{ importReport.importedCount }}</p>
        <p class="mb-1"><strong>Ignorados:</strong> {{ importReport.skippedCount }}</p>
        <p class="mb-1"><strong>Linhas invalidas:</strong> {{ importReport.invalidRows }}</p>
        <p class="mb-0"><strong>Conflitos:</strong> {{ importReport.conflicts.length ? importReport.conflicts.join(', ') : 'Nenhum' }}</p>
      </div>

      <div v-if="manualCopyText" class="mt-3">
        <p class="small-muted mb-2">Fallback de copia manual (Clipboard indisponivel):</p>
        <pre class="copy-fallback">{{ manualCopyText }}</pre>
      </div>
    </div>
  </div>
</template>
