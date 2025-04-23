import { ModeToggle } from "@/components/ModeToggle"
import Logo from "./Logo"

const Header = () => {
  return (
    <header className="flex justify-between items-center z-20 px-4 py-3 sticky top-0 brd bg-white dark:bg-black">
    <span className="font-bold text-lg">Home</span>
    <span className="flex items-center gap-4">
    <ModeToggle />
    <Logo width={16} />
    </span>
 </header>
  )
}

export default Header