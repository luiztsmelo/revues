import store from '@/store'

describe('@/store/index.ts', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('Mutations', () => {
    test('SET_LOADING', () => {
      store.commit('SET_LOADING', true)

      expect(store.state.loading).toBe(true)
    })
  })
})
