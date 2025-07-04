import React from 'react'
import mpGovLogo from '../assets/image/mp_gov_logo.png'
import digitalIndia from '../assets/image/digital-india.png'
import coverPage from "../assets/image/cover_page.jpg"

function Body() {
  return (
    <div className="relative isolate overflow-hidden">
        <div className="grid grid-cols-[auto_2fr_auto] mx-0 sm:mx-4 md:mx-20 lg:mx-60 items-center gap-4 rounded-tl-lg rounded-tr-lg border-1 border-solid bg-sky-900">
            <div className="flex justify-center">
                <img alt="" src={mpGovLogo} className="w-20 h-auto" />
            </div>
            <div>
                <p className="text-center text-white text-sm font-bold">
                उच्चदाब संयोजन पोर्टल... समस्त अति मूल्यवान उच्चदाब उर्जा सेवाओं को सरल, सुलभ एवं पारदर्शी बनाने का एक संकल्प
                </p>
            </div>
            <div className="flex justify-center">
                <img alt="" src={digitalIndia} className="w-20 h-auto" />
            </div>
        </div>
        <div className=" grid grid-cols-[auto_2fr_auto] mx-0 sm:mx-4 md:mx-20 lg:mx-60 items-center rounded-bl-lg rounded-br-lg border border-solid bg-sky-900 overflow-hidden">
            <div className="col-span-3">
                <img alt="" src={coverPage} className="w-full h-auto object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-center text-white text-lg font-bold  bg-opacity-40 px-4 py-2 rounded">
                    उच्चदाब संयोजन पोर्टल
                </h1>
                </div>
            </div>

        </div>
    </div>
  
  )
}

export default Body