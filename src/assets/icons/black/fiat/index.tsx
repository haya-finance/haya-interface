import EURBlack from "./eur";
import GBPBlack from "./gbp";
import JPYBlack from "./jpy";
import USDBlack from "./usd";


type Props = {
  name: string
  size: number
}

const BlackFiatIcon = ({ name, size }: Props) => {
  switch (name) {
    case "EUR":
      return <EURBlack size={size} />;
    case "GBP":
      return <GBPBlack size={size} />;
    case "JPY":
      return <JPYBlack size={size} />;
    case "USD":
      return <USDBlack size={size} />;
    default:
      return <div></div>
  }

}

export default BlackFiatIcon