<script setup lang="ts">
import type { DrawResult } from '../types/models'

defineProps<{
  result: DrawResult | null
}>()
</script>

<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <h2 class="h5 mb-3">Resultado do sorteio</h2>

      <div v-if="!result" class="alert alert-light border mb-0">Execute o sorteio para ver os times.</div>

      <div v-else class="row g-3">
        <div class="col-12 col-lg-6">
          <div class="border rounded p-3 h-100 bg-light-subtle">
            <h3 class="h6 text-uppercase">Time A</h3>
            <ol class="mb-0">
              <li v-for="player in result.teamA" :key="player.id">
                {{ player.name }}
                <span class="small-muted">({{ player.position }}, N{{ player.skillLevel }})</span>
              </li>
            </ol>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="border rounded p-3 h-100 bg-light-subtle">
            <h3 class="h6 text-uppercase">Time B</h3>
            <ol class="mb-0">
              <li v-for="player in result.teamB" :key="player.id">
                {{ player.name }}
                <span class="small-muted">({{ player.position }}, N{{ player.skillLevel }})</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
