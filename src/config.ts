// types
import { DefaultConfigProps } from 'types/config';

// ==============================|| THEME CONSTANT  ||============================== //

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_DEFAULT_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 6;
export const DRAWER_WIDTH = 260;
// 测试
// export const BasicIssuanceModule = "0x0Dd18972815D8A2b611F82F57E0bA26faaA972e1";
// export const UniswapSepoliaRouterContract = "0x03bF31D072F676ee35b3B065a9CDFD8085Cb7002";
// export const sepolia_rpc = "https://arbitrum-sepolia-rpc.publicnode.com"
// export const H30_Address = '0xEe06564B279EcdA4cBC7983cc46e603A1D908b6a';
// export const total_Address = "0xd84db6F731964b6ee52F66c7E6e86c2Eb5685894";
// // export const pair_Address = "0xc8d5A5b5E59dF02Eb3108158C724ED956b020029";
// export const pair_Address = "0x186a5B55DC2DE7e9dDF6b6d73b0E892187862F76";  //'0x186a5B55DC2DE7e9dDF6b6d73b0E892187862F76'
// export const ETH_Price_ARB = "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165"
// export const WETH_address = '0x0cE40884F9460593Dd804E346E2fE7CA9b35D3c7' //"0x0cE40884F9460593Dd804E346E2fE7CA9b35D3c7"
// export const USDT_ADDRESS = '0xD7fbE1d17b8bAB5e94377428fcDC04904f39c4F4'
// export const USDC_address = '0x3b88ef38959aC57f69eF2798e03c0E8994F1a3aa'
// export const USDT_PRICE = '0x80EDee6f667eCc9f63a0a6f55578F870651f06A4'
// export const USDC_PRICE = '0x0153002d20B96532C639313c2d54c3dA09109309'
// export const ETH_ADDRESS = '0x0d05D33Ab10870069DE5Aa7Ddcd42fbEB8C44dCd'
// export const arb_url = 'https://sepolia.arbiscan.io/address/' //'https://sepolia.arbiscan.io/address/'
// export const hash_url = 'https://sepolia.arbiscan.io/tx/'
// export const net_id = 421614
// export const network_Name = 'Arbitrum Sepolia'

// 主网
export const BasicIssuanceModule = '0xAFf6faCa3c4317a230c87Df006C91aA86958538E'  //"0x0Dd18972815D8A2b611F82F57E0bA26faaA972e1"; 
export const UniswapSepoliaRouterContract = '0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24' //"0x03bF31D072F676ee35b3B065a9CDFD8085Cb7002";
export const sepolia_rpc = 'https://arbitrum-one-rpc.publicnode.com'  //"https://arbitrum-sepolia-rpc.publicnode.com"
export const H30_Address = '0x250f93c92aebf7304c9e7e347d1aca8c0212edea' //'0xEe06564B279EcdA4cBC7983cc46e603A1D908b6a';
export const total_Address = '0xA533cB06073C08Bd78E56541279ef3247BaE1BeA' //"0xd84db6F731964b6ee52F66c7E6e86c2Eb5685894";
// export const pair_Address = "0xc8d5A5b5E59dF02Eb3108158C724ED956b020029";
export const pair_Address = '0x396EEdd12A43E68ecAca80021Db4F2E398dC88A0' //"0x09a5A8b579D17e06C7b021b6341dF4C3220C8C16";
export const ETH_Price_ARB = '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612'  //"0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165"
export const WETH_address = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1' //"0x0cE40884F9460593Dd804E346E2fE7CA9b35D3c7"
export const USDT_ADDRESS = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
export const USDC_address = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
export const USDT_PRICE = '0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7'
export const USDC_PRICE = '0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3'
export const ETH_ADDRESS = '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
export const net_id = 42161
export const network_Name = 'Arbitrum One'
export const arb_url = 'https://arbiscan.io/address/' //'https://sepolia.arbiscan.io/address/'
export const hash_url = 'https://arbiscan.io/tx/' //'https://sepolia.arbiscan.io/tx/'



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
