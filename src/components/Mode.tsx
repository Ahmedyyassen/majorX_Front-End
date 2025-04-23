import { Button } from "./ui/button"

const Mode = () => {
  return (
    <div className="brd py-2 bg-gray-50 dark:bg-demo-300">
        <div className="text-center p-6  bg-white dark:bg-demo-900 brd border-x ">
            <h3 className="dark:text-white text-gray-900 font-bold text-2xl mb-2 ">customize your view</h3>
            <p className="mb-5 text-sm text-gray-500">
                Manage your font size, color and backgound. These settings 
                affect all the Twitter accounts on this browser.
            </p>
             <div className="w-1/3 mx-auto">
             <Button>Toggle Dark Mode</Button>
             </div>
        </div>
    </div>
  )
}

export default Mode