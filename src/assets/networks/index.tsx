import Arbitrum from "./arbitrum";
import Ethereum from "./ethereum";


type Props = {
  name: string | undefined;
  size: number;
};

const Networks = ({ name, size }: Props) => {
  switch (name) {
    case 'Ethereum':
      return <Ethereum size={size} />;
    case "Sepolia":
      return <Ethereum size={size} />;
    case 'Arbitrum':
      return <Arbitrum size={size} />;
    case "Arbitrum Sepolia":
      return <Arbitrum size={size} />;
    default:
      return <div></div>;
  }
};

export default Networks;
