import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  it('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  it('zero works', () => {
    const action1 = {
      type: 'OK'
    }
    const action2 = {
      type: 'ZERO'
    }
    const state = initialState

    deepFreeze(state)
    const newState1 = counterReducer(state, action1)
    deepFreeze(newState1)
    const newState2 = counterReducer(newState1, action2)

    expect(newState2).toEqual(initialState)
  })
})