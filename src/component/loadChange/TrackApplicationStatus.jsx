import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
function TrackApplicationStatus() {
  return (
   <>
     <form>
           <div className="space-y-12 container mx-auto border my-5  rounded-md border-gray shadow-md">
             <div className="border-b border-gray-900/10 pb-12">
               <div class="block mb-2 border-b-2 p-2 ">
                 <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                   HT NSC Load Change Application
                 </h2>
                 {/* <p className="mt-1 text-sm/6 text-gray-600">
                   This information will be displayed publicly so be careful what you share.
                 </p> */}
               </div>
               <div className="body p-4">
                 <div className="border-b border-gray-900/10 pb-12">
                   <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                    Application No
                   </h2>
   
                   <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div>
      <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
        Price
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
          <input
            id="price"
            name="price"
            type="text"
            placeholder="0.00"
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
          <div className="grid shrink-0 grid-cols-1 focus-within:relative">
            <select
              id="currency"
              name="currency"
              aria-label="Currency"
              className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
        </div>
      </div>
    </div>

                    
                    
                     {/* <Input
                       LName="Total Required Contract Demand(in KVA)"
                       Iname="new_contact_demand"
                       type="number"
                       value={contractDemand}
                       onChange={handleContractDemand}
                       placeholder="please Enter New Contract  Demand"
                       errorMsg={error.newContactDemand}
                       disabled={isDisabled}
                     /> */}
                    
                   </div>
                 </div>
                 
                 {/* <div className="border-b border-gray-900/10 pb-12 ">
                   <div className="mt-10 flex flex-col justify-center items-center">
                     <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                       <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-red-600 duration-300">
                         Reset
                       </button>
                       {!showButton ? (
                         <button
                           type="submit"
                           class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                         >
                           Submit
                         </button>
                       ) : (
                         <button
                           type="submit"
                           className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                          
                         >
                           Update Details
                         </button>
                       )}
                     </div>
                   </div>
                 </div> */}
               </div>
             </div>
           </div>
         </form>
   </>
  )
}

export default TrackApplicationStatus