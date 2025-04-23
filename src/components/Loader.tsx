const Loader = () => {
    return (
      <div className="flex gap-x-4 p-6 items-center animate-pulse">
      <div className="rounded-full h-12 w-12 bg-gray-400"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
        <div className="h-4 bg-gray-400 rounded w-4/6"></div> 
      </div>
  </div>
    )
  }
  
  export default Loader