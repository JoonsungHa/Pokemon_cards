import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'wagmi/chains'

/**
 * Wagmi + RainbowKit config for Ethereum.
 * WalletConnect projectId from https://cloud.walletconnect.com
 */
export const config = getDefaultConfig({
  appName: 'Pokémon TCG',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '2d1797aeb1049c1ca93e1ace90a13646',
  chains: [mainnet, sepolia],
  ssr: false,
})
