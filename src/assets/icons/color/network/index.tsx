import BNBColor from "./bnb";
import ETHColor from "./eth";


type Props = {
  name: string
  size: number
}

const NetworkIcon = ({ name, size }: Props) => {
  switch (name) {
    case "Ethereum":
      return <ETHColor size={size} />;
    case "BNB chain":
      return <BNBColor size={size} />;
    default:
      return <div></div>
  }

}

export default NetworkIcon