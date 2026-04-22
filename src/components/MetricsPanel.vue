<script setup lang="ts">
import type { DrawResult } from '../types/models'

defineProps<{
  result: DrawResult | null
}>()
</script>

<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <h2 class="h5 mb-3">Metricas de equilibrio</h2>

      <div v-if="!result" class="small-muted">As metricas aparecem apos o sorteio.</div>

      <div v-else class="row g-2">
        <div class="col-12 col-md-6">
          <div class="border rounded p-3 text-center">
            <div class="small-muted">Diferenca de habilidade</div>
            <div class="display-6 mb-0">{{ result.metrics.skillDelta }}</div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="border rounded p-3 text-center">
            <div class="small-muted">Diferenca de quantidade</div>
            <div class="display-6 mb-0">{{ result.metrics.countDelta }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
