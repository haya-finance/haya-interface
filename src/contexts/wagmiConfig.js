
import { http, createConfig } from 'wagmi'
import { arbitrum } from 'wagmi/chains'
// import { arbitrumSepolia } from 'wagmi/chains'
import { walletConnect, coinbaseWallet, injected } from 'wagmi/connectors'
import icon from 'assets/icon.svg'

const projectId = 'ba194af96ee35dce47fc3fcbd424457c'


// arbitrum,


const metadata = {
  name: "Haya",
  description: "$Haya: Decentralized Crypto Bank for Digital Residents. Offering $H20 (first on-chain ETF) and a robust #DeFi and #GameFi ecosystem.",
  url: "https://app.haya.finance",
  icons: [icon],
}

// export const config = createConfig({
//   chains: [arbitrumSepolia],
//   projectId: projectId,
//   connectors: [
//     injected(),
//     // metaMask(),
//     walletConnect({ projectId, metadata, showQrModal: false }),
//     coinbaseWallet({
//       appName: 'Coinbase Wallet',
//     })
//   ],
//   transports: {
//     // [mainnet.id]: http(),
//     [arbitrumSepolia.id]: http()
//   }
// })

export const config = createConfig({
  chains: [arbitrum],
  projectId: projectId,
  connectors: [
    injected(),
    // metaMask(),
    walletConnect({ projectId, metadata, showQrModal: false }),
    coinbaseWallet({
      appName: 'Coinbase Wallet',
    })
  ],
  transports: {
    // [mainnet.id]: http(),
    [arbitrum.id]: http()
  }
})

// export const config = createConfig({
//   chains: [arbitrum],
//   connectors: [
//     injected({ target: 'metaMask', chains: [arbitrum] }),
//     walletConnect({ projectId }),
//     coinbaseWallet({
//       enableMobileWalletLink: true,
//       reloadOnDisconnect: true,
//       appName: 'Coinbase Wallet',
//     })
//   ],
//   transports: {
//     // [mainnet.id]: http(),
//     [arbitrum.id]: fallback([
//       unstable_connector(injected, coinbaseWallet, walletConnect),
//       http()
//     ])
//   }
// });



