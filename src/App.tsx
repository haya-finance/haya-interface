// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import Locales from 'components/Locales';
// import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import Notistack from 'components/third-party/Notistack';

// auth-provider
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import Product from 'pages/product';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context'
import { WagmiProvider } from 'wagmi';
import { watchChainId } from '@wagmi/core'
import { config } from 'contexts/wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react'

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //




const projectId = 'ba194af96ee35dce47fc3fcbd424457c'

const App = () => {
  const queryClient = new QueryClient()


  watchChainId(config, {
    onChange(chainId) {
      console.log('Chain ID changed!', chainId)
    },
  })

  createWeb3Modal({
    featuredWalletIds: [
      '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
      'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
      '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',


    ],
    wagmiConfig: config,
    projectId: projectId,
    allWallets: 'SHOW',
    enableAnalytics: true,
    enableOnramp: true,
    themeMode: 'light',

    themeVariables: {
      '--w3m-accent': '#1aae70',
      '--w3m-color-mix': '#f6f6f6',
      '--w3m-border-radius-master': '20px',
    }
  })

  return (
    <ThemeCustomization>
      {/* <RTLLayout> */}
      <Locales>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ScrollTop>
              <>
                <Notistack>
                  <Routes />
                  <Snackbar />
                  {/* <Product /> */}
                </Notistack>
              </>

            </ScrollTop>
          </QueryClientProvider>
        </WagmiProvider>
      </Locales>
      {/* </RTLLayout> */}
    </ThemeCustomization>
  )
}

export default App;
