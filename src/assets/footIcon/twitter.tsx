type Props = {
  size: number
}

const TwitterIcon = ({ size }: Props) => {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.474609" width="32" height="32" rx="10" fill="#464646" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.2446 16.7301L9 10.0579H13.1541L16.3916 14.1817L19.8503 10.0764H22.1382L17.4978 15.5908L23 22.5995H18.8583L15.3528 18.1398L11.6103 22.5872H9.31001L14.2446 16.7301ZM19.462 21.3633L11.5472 11.2941H12.55L20.4548 21.3633H19.462Z" fill="white" />
    </svg>


  )
}

export default TwitterIcon