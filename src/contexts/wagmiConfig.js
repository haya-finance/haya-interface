import {
  fallback,
  unstable_connector,
} from '@wagmi/core'
import { http, createConfig } from 'wagmi'
import { arbitrumSepolia } from 'wagmi/chains'
import { walletConnect, coinbaseWallet, injected } from 'wagmi/connectors'


const projectId = '823b8497d9c99138b4aebecfa4425469'




export const config = createConfig({
  chains: [arbitrumSepolia],
  connectors: [
    injected({ target: 'metaMask', chains: [arbitrumSepolia] }),
    walletConnect({ projectId }),
    coinbaseWallet({
      enableMobileWalletLink: true,
      reloadOnDisconnect: true,
      appName: 'Coinbase Wallet',
    })
  ],
  transports: {
    // [mainnet.id]: http(),
    [arbitrumSepolia.id]: fallback([
      unstable_connector(injected, coinbaseWallet, walletConnect),
      http()
    ])
  }
});



