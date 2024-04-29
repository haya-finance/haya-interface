import ADAColor from './ada';
import APT from './apt';
import ARB from './arb';
import ATOM from './atmo';
import AVAXColor from './avax';
import BNBColor from './bnb';
import BTCColor from './btc';
import DAIColor from './dai';
import DefaultToken from './default-token-icon';
import DefiPulseIndex from './defi-pulse-index';
import DOGEColor from './doge';
import DOTColor from './dot';
import ETHColor from './eth';
import FIL from './fil';
import FTM from './ftm';
import GRT from './grt';
import HAYColor from './h30';
import IMX from './imx';
import ING from './inj';
import KAS from './kas';
import LDO from './ldo';
import LinkColor from './link';
import LTCColor from './ltc';
import Matic from './matic';
import MKR from './mkr';
import MVI from './mvi';
import NEAR from './near';
import PEPE from './pepe';
import RNDR from './rndr';
import SHIBColor from './shib';
import SOLColor from './sol';
import TonCoinColor from './toncoin';
import TRXColor from './trx';
import UNI from './uni';
import USDCColor from './usdc';
import USDTColor from './usdt';
import WBtcColor from './wbtc';
import Weth from './weth';
import XRPColor from './xrp';

type Props = {
  name?: string;
  size: number;
};

const TokenColorIcon = ({ name, size }: Props) => {
  switch (name) {
    case 'BTC':
      return <BTCColor size={size} />;
    case 'ETH':
      return <ETHColor size={size} />;
    case 'XRP':
      return <XRPColor size={size} />;
    case 'SOL':
      return <SOLColor size={size} />;
    case 'DAI':
      return <DAIColor size={size} />;
    case 'WBNB':
      return <BNBColor size={size} />;
    case 'USDT':
      return <USDTColor size={size} />;
    case 'USDC':
      return <USDCColor size={size} />;
    case 'DPI':
      return <DefiPulseIndex size={size} />
    case 'MATIC':
      return <Matic size={size} />
    case 'MVI':
      return <MVI size={size} />
    case 'WETH':
      return <Weth size={size} />
    case 'ADA':
      return <ADAColor size={size} />
    case 'AVAX':
      return <AVAXColor size={size} />
    case 'DOGE':
      return <DOGEColor size={size} />
    case 'LTC':
      return <LTCColor size={size} />
    case 'WBTC':
      return <WBtcColor size={size} />
    case 'H3_test':
      return <HAYColor size={size} />
    case 'SHIB':
      return <SHIBColor size={size} />;
    case 'TONCOIN':
      return <TonCoinColor size={size} />;
    case 'LINK':
      return <LinkColor size={size} />;
    case 'TRX':
      return <TRXColor size={size} />;
    case 'DOT':
      return <DOTColor size={size} />
    case 'UNI':
      return <UNI size={size} />
    case 'NEAR':
      return <NEAR size={size} />
    case 'FIL':
      return <FIL size={size} />
    case 'APT':
      return <APT size={size} />
    case 'ATOM':
      return <ATOM size={size} />
    case 'IMX3':
      return <IMX size={size} />
    case 'INJ':
      return <ING size={size} />
    case 'PEPE':
      return <PEPE size={size} />
    case 'RNDR':
      return <RNDR size={size} />
    case 'GRT':
      return <GRT size={size} />
    case 'KAS':
      return <KAS size={size} />
    case 'LDO':
      return <LDO size={size} />
    case 'MKR':
      return <MKR size={size} />
    case 'ARB':
      return <ARB size={size} />
    case 'FTM':
      return <FTM size={size} />
    default:
      return <DefaultToken size={size} />;
  }
};

export default TokenColorIcon;
