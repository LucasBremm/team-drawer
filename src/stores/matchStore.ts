import { defineStore } from 'pinia'
import type { DrawResult, ImportReport, Player, PlayerFormInput } from '../types/models'
import { createPlayer, executeDraw, importPlayers, updatePlayer } from '../application/useCases'
import { copyToClipboard } from '../services/clipboardService'
import { parseImportJson, exportPlayersToJson } from '../services/jsonService'
import { loadPlayers, savePlayers } from '../services/storageService'
import { formatDrawForShare } from '../utils/format'

export type StatusTone = 'success' | 'warning' | 'error' | 'info'

interface StatusMessage {
  tone: StatusTone
  text: string
}

interface MatchState {
  players: Player[]
  selectedPlayerIds: string[]
  drawResult: DrawResult | null
  importReport: ImportReport | null
  status: StatusMessage | null
  manualCopyText: string
}

export const useMatchStore = defineStore('match', {
  state: (): MatchState => ({
    players: [],
    selectedPlayerIds: [],
    drawResult: null,
    importReport: null,
    status: null,
    manualCopyText: '',
  }),
  getters: {
    selectedPlayers(state): Player[] {
      const selected = new Set(state.selectedPlayerIds)
      return state.players.filter((player) => selected.has(player.id))
    },
    canDraw(): boolean {
      return this.selectedPlayerIds.length >= 4
    },
  },
  actions: {
    hydratePlayers(): void {
      this.players = loadPlayers()
      this.selectedPlayerIds = this.selectedPlayerIds.filter((id) => this.players.some((player) => player.id === id))
    },

    clearStatus(): void {
      this.status = null
    },

    addPlayer(input: PlayerFormInput): boolean {
      const result = createPlayer(this.players, input)
      if (!result.ok || !result.value) {
        this.status = { tone: 'error', text: result.error ?? 'Nao foi possivel cadastrar o jogador.' }
        return false
      }

      this.players.push(result.value)
      savePlayers(this.players)
      this.status = { tone: 'success', text: 'Jogador cadastrado com sucesso.' }
      return true
    },

    updatePlayer(playerId: string, input: PlayerFormInput): boolean {
      const result = updatePlayer(this.players, playerId, input)
      if (!result.ok || !result.value) {
        this.status = { tone: 'error', text: result.error ?? 'Nao foi possivel atualizar o jogador.' }
        return false
      }

      this.players = this.players.map((player) => (player.id === playerId ? result.value! : player))
      savePlayers(this.players)
      this.status = { tone: 'success', text: 'Jogador atualizado com sucesso.' }
      return true
    },

    removePlayer(playerId: string): void {
      this.players = this.players.filter((player) => player.id !== playerId)
      this.selectedPlayerIds = this.selectedPlayerIds.filter((id) => id !== playerId)
      savePlayers(this.players)
      this.drawResult = null
      this.status = { tone: 'warning', text: 'Jogador removido.' }
    },

    toggleParticipant(playerId: string): void {
      if (this.selectedPlayerIds.includes(playerId)) {
        this.selectedPlayerIds = this.selectedPlayerIds.filter((id) => id !== playerId)
      } else {
        this.selectedPlayerIds = [...this.selectedPlayerIds, playerId]
      }
      this.drawResult = null
    },

    selectAllParticipants(): void {
      this.selectedPlayerIds = this.players.map((player) => player.id)
      this.drawResult = null
    },

    clearParticipants(): void {
      this.selectedPlayerIds = []
      this.drawResult = null
    },

    runDraw(): boolean {
      const result = executeDraw(this.selectedPlayers)
      if (!result.ok || !result.value) {
        this.status = { tone: 'error', text: result.error ?? 'Falha ao sortear times.' }
        return false
      }

      this.drawResult = result.value
      this.manualCopyText = ''
      this.status = { tone: 'success', text: 'Sorteio concluido.' }
      return true
    },

    reroll(): boolean {
      return this.runDraw()
    },

    async copyDrawResult(): Promise<boolean> {
      if (!this.drawResult) {
        this.status = { tone: 'error', text: 'Nenhum resultado para copiar.' }
        return false
      }

      const text = formatDrawForShare(this.drawResult)
      const result = await copyToClipboard(text)

      if (result.ok) {
        this.manualCopyText = ''
        this.status = { tone: 'success', text: 'Times copiados para a area de transferencia.' }
        return true
      }

      if (result.usedFallback && result.manualText) {
        this.manualCopyText = result.manualText
        this.status = {
          tone: 'warning',
          text: result.error ?? 'Copia automatica indisponivel. Use a copia manual abaixo.',
        }
        return false
      }

      this.status = {
        tone: 'error',
        text: result.error ?? 'Falha ao copiar os times.',
      }
      return false
    },

    exportPlayers(): string {
      return exportPlayersToJson(this.players)
    },

    importPlayersFromJson(rawText: string): boolean {
      const parsed = parseImportJson(rawText)
      if (!parsed.ok || !parsed.payload) {
        this.status = { tone: 'error', text: parsed.error ?? 'Erro de importacao.' }
        return false
      }

      const result = importPlayers(this.players, parsed.payload.players)
      this.players = result.players
      this.importReport = result.report
      savePlayers(this.players)

      if (result.report.conflicts.length || result.report.invalidRows) {
        this.status = {
          tone: 'warning',
          text: `Importacao concluida com ressalvas. Importados: ${result.report.importedCount}.`,
        }
      } else {
        this.status = { tone: 'success', text: `Importacao concluida. Importados: ${result.report.importedCount}.` }
      }

      return true
    },
  },
})
