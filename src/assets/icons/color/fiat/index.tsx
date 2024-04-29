import EURColor from "./eur";
import GBPColor from "./gbp";
import JPYColor from "./jpy";
import USDColor from "./usd";


type Props = {
  name: string
  size: number
}

const ColorFiatIcon = ({ name, size }: Props) => {
  switch (name) {
    case "EUR":
      return <EURColor size={size} />;
    case "GBP":
      return <GBPColor size={size} />;
    case "JPY":
      return <JPYColor size={size} />;
    case "USD":
      return <USDColor size={size} />;
    default:
      return <div></div>
  }

}

export default ColorFiatIcon