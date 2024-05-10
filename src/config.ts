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
export const UniswapSepoliaRouterContract = "0x03bF31D072F676ee35b3B065a9CDFD8085Cb7002";
export const sepolia_rpc = "https://arbitrum-sepolia-rpc.publicnode.com"
export const H30_Address = '0xAD400a14150740F276aa8EDb5aF66FD19137520e';
export const total_Address = "0xd84db6F731964b6ee52F66c7E6e86c2Eb5685894";
export const pair_Address = "0xc8d5A5b5E59dF02Eb3108158C724ED956b020029"


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
