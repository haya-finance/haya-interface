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

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //






const App = () => {
  const queryClient = new QueryClient()


  watchChainId(config, {
    onChange(chainId) {
      console.log('Chain ID changed!', chainId)
    },
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
