import BNBColor from './bnb';
import BTCColor from './btc';
import DAIColor from './dai';
import ETHColor from './eth';
import SOLColor from './sol';
import USDCColor from './usdc';
import USDTColor from './usdt';
import XRPColor from './xrp';

type Props = {
  name: string;
  size: number;
};

const CryptoColorIcon = ({ name, size }: Props) => {
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
    case 'BNB':
      return <BNBColor size={size} />;
    case 'USDT':
      return <USDTColor size={size} />;
    case 'USDC':
      return <USDCColor size={size} />;
    default:
      return <div></div>;
  }
};

export default CryptoColorIcon;
