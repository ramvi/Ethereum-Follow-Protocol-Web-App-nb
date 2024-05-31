'use client'

import { optimismSepolia } from 'viem/chains'
import { WagmiProvider, type State } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import { useState } from 'react'
import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { CartProvider } from '#/contexts/cart-context'
import { ActionsProvider } from '#/contexts/actions-context'
import { TransactionsProvider } from '#/contexts/transactions-context'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

// const persister = createSyncStoragePersister({
//   serialize,
//   deserialize,
//   storage: window.localStorage
// })

const DEFAULT_CHAIN_ID = optimismSepolia.id

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { gcTime: 1 * DAY, staleTime: 1 * MINUTE }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <WagmiProvider config={wagmiConfig} reconnectOnMount={true} initialState={initialState}>
          {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
          <RainbowKitProvider
            coolMode={true}
            initialChain={DEFAULT_CHAIN_ID}
            showRecentTransactions={true}
          >
            <CartProvider>
              <EFPProfileProvider>
                <TransactionsProvider>
                  <ActionsProvider>
                    <Navigation />
                    {children}
                  </ActionsProvider>
                </TransactionsProvider>
              </EFPProfileProvider>
            </CartProvider>
          </RainbowKitProvider>
          {/* </PersistQueryClientProvider> */}
        </WagmiProvider>
      </ReactQueryStreamedHydration>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default Providers
