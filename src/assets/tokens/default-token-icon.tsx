type Props = {
  size: number
}

const DefaultToken = ({ size }: Props) => {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="22" height="22" rx="11" fill="#9B9B9B" />

    </svg>

  )
}

export default DefaultToken