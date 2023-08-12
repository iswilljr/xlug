'use client'

import { createContext, useContext, useRef } from 'react'
import { useStoreWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import type { StoreApi } from 'zustand'

type Provider<Id extends string, Props> = Record<`${Id}Provider`, React.FC<React.PropsWithChildren<Props>>>
type UseState<Id extends string, State> = Record<`use${Id}State`, <S = State>(selector?: (state: State) => S) => S>
type UseStore<Id extends string, State> = Record<`use${Id}Store`, () => StoreApi<State>>

interface StoreWithInitPropsOptions<Id extends string, State, InitProps> {
  id: Id
  create: (initProps: InitProps) => StoreApi<State>
}

type StoreWithInitProps<Id extends string, State, InitProps> = Provider<Id, InitProps> &
  UseState<Id, State> &
  UseStore<Id, State>

export function createStoreWithInitProps<Id extends string, State, InitProps>(
  options: StoreWithInitPropsOptions<Id, State, InitProps>
): StoreWithInitProps<Id, State, InitProps> {
  const { id, create } = options

  const name = `${id}Provider`
  const Context = createContext<StoreApi<State> | null>(null)
  const createStore = (initProps: InitProps) => create(initProps)

  type ProviderProps = React.PropsWithChildren<InitProps>

  function Provider({ children, ...props }: ProviderProps) {
    const storeRef = useRef<StoreApi<State>>(createStore(props as unknown as InitProps))

    return <Context.Provider value={storeRef.current}>{children}</Context.Provider>
  }

  Provider.displayName = name

  function useStore() {
    const store = useContext(Context)
    if (!store) throw new Error(`Missing ${name} in the tree`)
    return store
  }

  function useState<const T = State>(selector?: (state: State) => T): T {
    return useStoreWithEqualityFn(useStore(), selector ?? ((state: State) => state as any), shallow)
  }

  return {
    [`${id}Provider`]: Provider,
    [`use${id}Store`]: useStore,
    [`use${id}State`]: useState,
  } as unknown as StoreWithInitProps<Id, State, InitProps>
}
