const Search = () => {
    return (
      <div className="flex justify-start items-start rounded-full h-10  bg-gray-200 dark:bg-demo-400
      border-gray-200 dark:border-demo-400">
      <span className="ml-4 mr-2 h-full leading-10 cursor-pointer hover:text-white transition  text-lg text-gray-600"><i className="fa-solid fa-magnifying-glass"></i></span>
      <input type="text" id="search" name="search" className=" w-full focus:outline-none h-full p-2  font-normal text-sm
     text-gray-100 caret-white placeholder:text-gray-400" placeholder="Srearch Twitter" />
    </div>  )
  }
  
  export default Search