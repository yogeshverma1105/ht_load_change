import React from 'react'

function Footer() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 ">
        <div className="grid grid-flow-col gap-4 mx-0 sm:mx-4 md:mx-20 lg:mx-40">
          <div className="col-span-6 px-5">
                <h3 className='text-left text-white '>CALL US NOW</h3>
                <p className='text-left text-white '>+91 755 2551222</p>
                <p className='text-left text-white'>+91 755 2551222</p>
          </div>
          <div className="col-span-6 px-5">
                <h3 className='text-center text-white'>CONNECT WITH US</h3>
                <p className='text-center text-white'> +91 755 2551222</p>
          </div>
          <div className="col-span-6 px-5">
                <span className='text-right text-white'>ADDRESS:</span>
                <span className='text-center text-white'><p>IT CELL, O/O. MANAGING DIRECTOR, MPMKVVCL,</p></span>
                <span className='text-center text-white'> <p>NISHTHA PARISAR, GOVINDPURA, BHOPAL - 462023.</p></span>
            </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
        <div className="grid grid-flow-col gap-4 mx-0 sm:mx-4 md:mx-20 lg:mx-40">
          <div className="col-span-6 px-5">
                <h3 className='text-left text-white '> 2023 , ALL RIGHTS RESERVED BY MPMKVVCL</h3>
          </div>
          <div className="col-span-6 px-5">
                <h3 className='text-center text-white'>Version 1.3</h3>
          </div>
          <div className="col-span-6 px-5">
                <p className='text-right text-white'>Developed and Managed by : IT CELL, MPMKVVCL BHOPAL</p>
            </div>
        </div>
    </div>
   
  )
}

export default Footer