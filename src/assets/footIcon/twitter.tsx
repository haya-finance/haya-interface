type Props = {
  size: number
}

const TwitterIcon = ({ size }: Props) => {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.474609" width="32" height="32" rx="10" fill="#C0C0C0" />
      <g clip-path="url(#clip0_5936_1864)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7446 16.7301L9.5 10.0579H13.6541L16.8916 14.1817L20.3503 10.0764H22.6382L17.9978 15.5908L23.5 22.5995H19.3583L15.8528 18.1398L12.1103 22.5872H9.81001L14.7446 16.7301ZM19.962 21.3633L12.0472 11.2941H13.05L20.9548 21.3633H19.962Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_5936_1864">
          <rect width="14" height="14" fill="white" transform="translate(9.5 9.47461)" />
        </clipPath>
      </defs>
    </svg>



  )
}

export default TwitterIcon