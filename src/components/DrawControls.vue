<script setup lang="ts">
defineProps<{
  selectedCount: number
  canDraw: boolean
  hasResult: boolean
}>()

const emit = defineEmits<{
  draw: []
  reroll: []
  copy: []
}>()
</script>

<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
      <div>
        <h2 class="h5 mb-1">Sorteio</h2>
        <p class="small-muted mb-0">Selecionados: {{ selectedCount }} (minimo de 4 para sortear)</p>
      </div>

      <div class="d-flex gap-2">
        <button type="button" class="btn btn-success" :disabled="!canDraw" @click="emit('draw')">Sortear times</button>
        <button type="button" class="btn btn-outline-success" :disabled="!hasResult" @click="emit('reroll')">Ressortear</button>
        <button type="button" class="btn btn-outline-primary" :disabled="!hasResult" @click="emit('copy')">Copiar times</button>
      </div>
    </div>
  </div>
</template>
