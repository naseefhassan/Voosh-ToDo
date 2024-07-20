
function Done() {
  return (
    <>
     <div>
        <div className="text-white">
          <h1 className="font-semibold mx-1 bg-blue-600 p-[2px] px-2 rounded-sm ">
            Done
          </h1>
          <div className="max-h-[300px] overflow-y-scroll mt-3 no-scrollbar">
         {/* {task.map((item,index)=>(
           <div key={index} className="text-black bg-blue-200 rounded-md mx-1 p-2 my-2 ">
           <div>
             <h1 className="font-bold">{item.task}</h1>
             <h1 className="font-semibold text-sm">{item.description}</h1>
           </div>
           <h1 className="text-[12px] mt-5">Created at :  {new Date(item.createdAt).toLocaleString()}</h1>
           <div className="text-sm flex justify-end gap-3 text-white">
             <button className="bg-red-600 p-1 px-2 rounded-md">Delete</button>
             <button className="bg-blue-400 p-1 px-2 rounded-md">Edit</button>
             <button className="bg-blue-700 p-1 px-2 rounded-md">
               View Details
             </button>
           </div>
         </div>
         ))} */}
         </div>
        </div>
      </div>
    </>
  );
}

export default Done;
