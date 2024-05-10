type Props = {
  size: number
}

const GithubIcon = ({ size }: Props) => {
  return (
    <svg width={`${size}`} height={`${size}`} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.474609" width="32" height="32" rx="10" fill="#C0C0C0" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.4992 7C11.5303 7 7.5 11.1312 7.5 16.2281C7.5 20.3042 10.0785 23.7627 13.6549 24.9833C14.1049 25.0678 14.2694 24.7826 14.2694 24.5387C14.2694 24.3195 14.261 23.7394 14.2565 22.9689C11.7533 23.5269 11.2246 21.7324 11.2246 21.7324C10.8159 20.6664 10.2259 20.3824 10.2259 20.3824C9.40856 19.8097 10.2878 19.8218 10.2878 19.8218C11.1911 19.887 11.6659 20.7722 11.6659 20.7722C12.4691 22.1828 13.773 21.7757 14.2857 21.5392C14.3673 20.9424 14.5999 20.5358 14.8567 20.3051C12.8584 20.0727 10.7574 19.2809 10.7574 15.7448C10.7574 14.7379 11.1082 13.9138 11.6839 13.269C11.5911 13.0355 11.2822 12.0983 11.7722 10.8279C11.7722 10.8279 12.5279 10.5799 14.2472 11.7737C14.9649 11.5689 15.735 11.4668 16.5 11.4634C17.265 11.4668 18.0348 11.5692 18.7534 11.7739C20.4718 10.5802 21.2256 10.8282 21.2256 10.8282C21.7172 12.0983 21.4084 13.0363 21.3156 13.2699C21.8927 13.9152 22.2409 14.7391 22.2409 15.746C22.2409 19.2907 20.1363 20.0713 18.1318 20.299C18.4547 20.5845 18.7421 21.1468 18.7421 22.0081C18.7421 23.2417 18.7314 24.2371 18.7314 24.5398C18.7314 24.7858 18.8937 25.0733 19.3502 24.983C22.9237 23.7596 25.5 20.3028 25.5 16.2278C25.5 11.1315 21.4703 7 16.4992 7Z" fill="white" />
    </svg>


  )
}

export default GithubIcon