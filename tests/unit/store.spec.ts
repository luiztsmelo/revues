import store from '@/store'

describe('@/store/index.ts', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  describe('Mutations', () => {
    describe('SET_LOADING', () => {
      test('Should set loading state correctly', () => {
        store.commit('SET_LOADING', true)
  
        expect(store.state.loading).toBe(true)
      })
    })
    describe('SET_OPENDED_FILTER', () => {
      test('Should set openedFilter state correctly', () => {
        store.commit('SET_OPENDED_FILTER', 'score')
  
        expect(store.state.openedFilter).toBe('score')
      })
    })
  })
})
