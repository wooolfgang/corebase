/* eslint-disable no-unused-vars */
import create from 'zustand/vanilla'
import createReactStore from 'zustand'
import { NexusGenObjects } from 'src/generated/nexus-typegen'

export interface AuthStoreInterface {
  accessToken: string | null
  setAccessToken: (accessToken: string) => void
  removeAccessToken: () => void
  user: NexusGenObjects['User'] | null
  setUser: (user: NexusGenObjects['User']) => void
  revokeAuth: () => void
}

export const store = create<AuthStoreInterface>(set => ({
  accessToken: null,
  user: null,
  setAccessToken: (accessToken: string) =>
    set(state => ({ ...state, accessToken })),
  removeAccessToken: () => set(state => ({ ...state, accessToken: null })),
  setUser: (user: NexusGenObjects['User']) =>
    set(state => ({ ...state, user })),
  removeUser: () => set(state => ({ ...state, user: null })),
  revokeAuth: () => set({ user: null, accessToken: null })
}))

export const useStore = createReactStore(store)
