
import CoinWllet from "./coinwallet";
import MetaMask from "./MetaMask";
import WalletConnect from "./walletConnect";


type Props = {
  name: string | undefined;
  size: number;
};

const WalletIcon = ({ name, size }: Props) => {
  switch (name) {
    case 'MetaMask':
      return <MetaMask size={size} />;
    case "Coinbase Wallet":
      return <CoinWllet size={size} />;
    case 'WalletConnect':
      return <WalletConnect size={size} />;
    default:
      return <div></div>;
  }
};

export default WalletIcon;
