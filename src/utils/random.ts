export type RandomSource = () => number

export function createSeededRandom(seed: number): RandomSource {
  let state = seed >>> 0
  return () => {
    state = (1664525 * state + 1013904223) >>> 0
    return state / 0x100000000
  }
}

export function randomInt(maxExclusive: number, random: RandomSource = Math.random): number {
  return Math.floor(random() * maxExclusive)
}

export function randomChoice<T>(items: T[], random: RandomSource = Math.random): T {
  return items[randomInt(items.length, random)]
}

export function shuffle<T>(items: T[], random: RandomSource = Math.random): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1, random)
    const temp = copy[index]
    copy[index] = copy[swapIndex]
    copy[swapIndex] = temp
  }
  return copy
}
