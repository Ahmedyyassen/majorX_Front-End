import { FaXTwitter } from "react-icons/fa6";

type Props={
    width: number
}
const Logo = ({width}: Props) => {
  return (
    <a className="link-active my-2 w-fit overflow-hidden text-black dark:text-white">
      <span><FaXTwitter style={{fontSize:`${width}px`}} />  </span>
     </a>
  )
}

export default Logo
