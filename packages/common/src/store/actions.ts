import { store } from './index'
import { Email } from './types'

// actions, aka async mutations

export const setReduxState = (k: string, v: string | boolean | number) =>
  store.dispatch({
    type: 'setReduxState',
    key: k,
    value: v,
  })

export const appendEmails = (k: string, v: Array<Email>) =>
  store.dispatch({
    type: 'appendEmails',
    key: k,
    value: v,
  })
