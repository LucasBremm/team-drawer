import type { DrawResult, Player, PlayerPosition } from '../types/models'
import { PLAYER_POSITIONS } from '../types/models'
import { calculateDrawMetrics, getTeamSkillTotal } from './metrics'
import { randomChoice, shuffle } from '../utils/random'
import type { RandomSource } from '../utils/random'

interface Partition {
  teamA: Player[]
  teamB: Player[]
  skillDelta: number
  positionViolationScore: number
}

type PositionDistribution = number[]

const POSITION_DELTA_LIMIT = 1

function createPositionCounter(): Record<PlayerPosition, number> {
  return {
    Goleiro: 0,
    Defesa: 0,
    Meio: 0,
    Atacante: 0,
  }
}

function calculatePositionViolationScore(teamA: Player[], teamB: Player[]): number {
  const positionCountsA = createPositionCounter()
  const positionCountsB = createPositionCounter()

  for (const player of teamA) {
    positionCountsA[player.position] += 1
  }

  for (const player of teamB) {
    positionCountsB[player.position] += 1
  }

  return PLAYER_POSITIONS.reduce((score, position) => {
    const delta = Math.abs(positionCountsA[position] - positionCountsB[position])
    return score + Math.max(0, delta - POSITION_DELTA_LIMIT)
  }, 0)
}

function hasSameScore(left: Partition, right: Partition): boolean {
  return left.positionViolationScore === right.positionViolationScore && left.skillDelta === right.skillDelta
}

function isBetterPartition(candidate: Partition, currentBest: Partition): boolean {
  if (candidate.positionViolationScore < currentBest.positionViolationScore) {
    return true
  }

  if (candidate.positionViolationScore > currentBest.positionViolationScore) {
    return false
  }

  return candidate.skillDelta < currentBest.skillDelta
}

function buildPartitionByIndexes(players: Player[], teamAIndexes: number[]): Partition {
  const teamAIndexSet = new Set(teamAIndexes)
  const teamA: Player[] = []
  const teamB: Player[] = []

  players.forEach((player, index) => {
    if (teamAIndexSet.has(index)) {
      teamA.push(player)
    } else {
      teamB.push(player)
    }
  })

  return {
    teamA,
    teamB,
    skillDelta: Math.abs(getTeamSkillTotal(teamA) - getTeamSkillTotal(teamB)),
    positionViolationScore: calculatePositionViolationScore(teamA, teamB),
  }
}

function exactDraw(players: Player[], random: RandomSource): Partition {
  const targetSizes = Array.from(new Set([Math.floor(players.length / 2), Math.ceil(players.length / 2)]))
  const bestCandidates: Partition[] = []

  const teamAIndexes: number[] = []
  const dfs = (start: number, remaining: number) => {
    if (remaining === 0) {
      const partition = buildPartitionByIndexes(players, teamAIndexes)
      if (bestCandidates.length === 0 || isBetterPartition(partition, bestCandidates[0])) {
        bestCandidates.length = 0
        bestCandidates.push(partition)
      } else if (hasSameScore(partition, bestCandidates[0])) {
        bestCandidates.push(partition)
      }
      return
    }

    for (let i = start; i <= players.length - remaining; i += 1) {
      teamAIndexes.push(i)
      dfs(i + 1, remaining - 1)
      teamAIndexes.pop()
    }
  }

  for (const size of targetSizes) {
    dfs(0, size)
  }

  return randomChoice(bestCandidates, random)
}

function groupPlayersByPosition(players: Player[]): Record<PlayerPosition, Player[]> {
  const groups: Record<PlayerPosition, Player[]> = {
    Goleiro: [],
    Defesa: [],
    Meio: [],
    Atacante: [],
  }

  for (const player of players) {
    groups[player.position].push(player)
  }

  return groups
}

function positionViolationForTeamACount(teamACount: number, totalCount: number): number {
  const delta = Math.abs(2 * teamACount - totalCount)
  return Math.max(0, delta - POSITION_DELTA_LIMIT)
}

function findBestPositionDistributions(
  groupedByPosition: Record<PlayerPosition, Player[]>,
  teamASize: number,
): PositionDistribution[] {
  const positionTotals = PLAYER_POSITIONS.map((position) => groupedByPosition[position].length)
  const suffixTotals = new Array(positionTotals.length + 1).fill(0)

  for (let index = positionTotals.length - 1; index >= 0; index -= 1) {
    suffixTotals[index] = suffixTotals[index + 1] + positionTotals[index]
  }

  let bestViolation = Number.POSITIVE_INFINITY
  const bestDistributions: PositionDistribution[] = []
  const currentDistribution = new Array(positionTotals.length).fill(0)

  const search = (positionIndex: number, selectedForTeamA: number, accumulatedViolation: number) => {
    if (positionIndex === positionTotals.length) {
      if (selectedForTeamA !== teamASize) {
        return
      }

      if (accumulatedViolation < bestViolation) {
        bestViolation = accumulatedViolation
        bestDistributions.length = 0
        bestDistributions.push([...currentDistribution])
      } else if (accumulatedViolation === bestViolation) {
        bestDistributions.push([...currentDistribution])
      }
      return
    }

    const remainingSlots = teamASize - selectedForTeamA
    const remainingPlayersAfterCurrent = suffixTotals[positionIndex + 1]
    const currentPositionTotal = positionTotals[positionIndex]

    const minForCurrent = Math.max(0, remainingSlots - remainingPlayersAfterCurrent)
    const maxForCurrent = Math.min(currentPositionTotal, remainingSlots)

    for (let countForTeamA = minForCurrent; countForTeamA <= maxForCurrent; countForTeamA += 1) {
      const nextViolation = accumulatedViolation + positionViolationForTeamACount(countForTeamA, currentPositionTotal)
      if (nextViolation > bestViolation) {
        continue
      }

      currentDistribution[positionIndex] = countForTeamA
      search(positionIndex + 1, selectedForTeamA + countForTeamA, nextViolation)
    }
  }

  search(0, 0, 0)
  return bestDistributions
}

function buildPartitionFromDistribution(
  groupedByPosition: Record<PlayerPosition, Player[]>,
  distribution: PositionDistribution,
  random: RandomSource,
): Partition {
  const teamA: Player[] = []
  const teamB: Player[] = []

  PLAYER_POSITIONS.forEach((position, index) => {
    const playersForPosition = shuffle(groupedByPosition[position], random)
    const countForTeamA = distribution[index]

    teamA.push(...playersForPosition.slice(0, countForTeamA))
    teamB.push(...playersForPosition.slice(countForTeamA))
  })

  const shuffledTeamA = shuffle(teamA, random)
  const shuffledTeamB = shuffle(teamB, random)

  return {
    teamA: shuffledTeamA,
    teamB: shuffledTeamB,
    skillDelta: Math.abs(getTeamSkillTotal(shuffledTeamA) - getTeamSkillTotal(shuffledTeamB)),
    positionViolationScore: calculatePositionViolationScore(shuffledTeamA, shuffledTeamB),
  }
}

function heuristicDraw(players: Player[], random: RandomSource): Partition {
  const groupedByPosition = groupPlayersByPosition(players)
  const targetSizes = Array.from(new Set([Math.floor(players.length / 2), Math.ceil(players.length / 2)]))
  const attemptsPerSize = Math.max(120, players.length * 12)
  let best: Partition | null = null

  for (const teamASize of targetSizes) {
    const bestDistributions = findBestPositionDistributions(groupedByPosition, teamASize)
    if (bestDistributions.length === 0) {
      continue
    }

    for (let attempt = 0; attempt < attemptsPerSize; attempt += 1) {
      const distribution = randomChoice(bestDistributions, random)
      const candidate = buildPartitionFromDistribution(groupedByPosition, distribution, random)

      if (!best || isBetterPartition(candidate, best)) {
        best = candidate
      } else if (best && hasSameScore(candidate, best) && random() < 0.5) {
        best = candidate
      }
    }
  }

  if (!best) {
    throw new Error('Falha ao executar sorteio heuristico.')
  }

  return best
}

export function drawBalancedTeams(players: Player[], random: RandomSource = Math.random): DrawResult {
  if (players.length < 4) {
    throw new Error('Selecione ao menos 4 jogadores para sortear os times.')
  }

  const partition = players.length <= 20 ? exactDraw(players, random) : heuristicDraw(players, random)
  const metrics = calculateDrawMetrics(partition.teamA, partition.teamB)

  return {
    teamA: partition.teamA,
    teamB: partition.teamB,
    metrics,
  }
}
