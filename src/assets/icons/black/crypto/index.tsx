import BTCBlack from "./btc"
import ETHBlack from "./eth";
import SOLBlack from "./sol";
import XRPBlack from "./xrp";

type Props = {
  name: string
  size: number
}

const BlackIcon = ({ name, size }: Props) => {
  switch (name) {
    case "BTC":
      return <BTCBlack size={size} />;
    case "ETH":
      return <ETHBlack size={size} />;
    case "XRP":
      return <XRPBlack size={size} />;
    case "SOL":
      return <SOLBlack size={size} />;
    default:
      return <div></div>
  }

}

export default BlackIcon