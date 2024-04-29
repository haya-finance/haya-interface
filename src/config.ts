// types
import { DefaultConfigProps } from 'types/config';

// ==============================|| THEME CONSTANT  ||============================== //

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_DEFAULT_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;
export const BasicIssuanceModule = "0x0Dd18972815D8A2b611F82F57E0bA26faaA972e1";
export const UniswapSepoliaRouterContract = "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008";
export const sepolia_rpc = "https://arb-sepolia.g.alchemy.com/v2/k4x_zgCFGtWQv6DoYyKGrWrvnpYJsVl_"
export const H30_Address = '0xc5Be028b3fb021EdA7C7bc86554a695bBf596565'


// ==============================|| THEME CONFIG  ||============================== //

const config: DefaultConfigProps = {
  fontFamily: `'Public Sans', sans-serif`,
  i18n: 'en',
  menuOrientation: 'vertical',
  miniDrawer: false,
  container: true,
  mode: 'light',
  presetColor: 'default',
  themeDirection: 'ltr'
};

export default config;
