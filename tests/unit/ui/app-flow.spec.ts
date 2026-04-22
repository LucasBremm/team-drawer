import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import App from '../../../src/App.vue'
import { useMatchStore } from '../../../src/stores/matchStore'
import { PLAYERS_STORAGE_KEY } from '../../../src/services/storageService'

describe('app flow', () => {
  it('disables draw until at least four participants are selected', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    localStorage.setItem(
      PLAYERS_STORAGE_KEY,
      JSON.stringify([
        { id: '1', name: 'A', position: 'Meio', skillLevel: 7 },
        { id: '2', name: 'B', position: 'Defesa', skillLevel: 6 },
        { id: '3', name: 'C', position: 'Atacante', skillLevel: 5 },
        { id: '4', name: 'D', position: 'Goleiro', skillLevel: 4 },
      ]),
    )

    const store = useMatchStore()

    const wrapper = mount(App, {
      global: {
        plugins: [pinia],
      },
    })

    await nextTick()

    const drawButton = wrapper.findAll('button').find((button) => button.text() === 'Sortear times')
    expect(drawButton).toBeDefined()
    expect(drawButton?.attributes('disabled')).toBeDefined()

    store.selectedPlayerIds = ['1', '2', '3', '4']
    await nextTick()

    expect(drawButton?.attributes('disabled')).toBeUndefined()
    await drawButton?.trigger('click')

    expect(wrapper.text()).toContain('Time A')
  })
})
