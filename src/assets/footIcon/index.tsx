import DesIcon from "./des";
import GithubIcon from "./github";
import TelegramIcon from "./telegram";
import TwitterIcon from "./twitter";


type Props = {
  name: string
  size: number
}

const FootIcon = ({ name, size }: Props) => {
  switch (name) {
    case "Des":
      return <DesIcon size={size} />;
    case "GitHub":
      return <GithubIcon size={size} />;
    case "Telegram":
      return <TelegramIcon size={size} />;
    case "Twitter":
      return <TwitterIcon size={size} />;
    default:
      return <div></div>
  }

}

export default FootIcon