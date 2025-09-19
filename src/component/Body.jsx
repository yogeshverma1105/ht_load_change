import React from 'react';
import mpGovLogo from '../assets/image/mp_gov_logo.png';
import digitalIndia from '../assets/image/digital-india.png';
import coverPage from '../assets/image/cover_page.jpg';
import { Link } from 'react-router-dom';

function Body() {
  return (
    <div className="relative isolate overflow-hidden bg-[#E6E6FF]">
      <div className="flex ">
        <div className="w-1/5  p-4">
          <div className="counts relative rounded-sm shadow-lg p-2 text-center mb-5">
            <Link to="#">
              Track Ht NSC Application Status
              <br></br>
              आवेदन की स्थिति जानें
            </Link>

          </div>

          <div className="counts relative rounded-lg shadow-lg p-4 text-center mb-5 bg-white hover:shadow-xl transition-shadow duration-300">
            <Link
              to="/track-application"
              className="text-sky-900 font-semibold text-base hover:text-sky-700"
            >
              Track Load Change Application Status
              <br />
              <span className="text-sm text-gray-600">
                आवेदन की स्थिति जानें
              </span>
            </Link>
          </div>

          <div className="counts relative rounded-sm shadow-lg p-2 text-center mb-4">
            Track Name Transfer Application Status
            <br></br>
            आवेदन की स्थिति जानें
          </div>
        </div>
        <div className="w-3/5">
          <div className="relative items-center gap-4 rounded-tl-lg rounded-tr-lg border-1 border-solid bg-sky-900 block w-full m-0">
            <div className="block">
              <div>
                <div className="flex justify-center">
                  <img alt="" src={mpGovLogo} className="w-20 h-auto" />
                </div>
                <div>
                  <p className="text-center text-white text-sm font-bold">
                    उच्चदाब संयोजन पोर्टल... समस्त अति मूल्यवान उच्चदाब उर्जा सेवाओं को सरल, सुलभ
                    एवं पारदर्शी बनाने का एक संकल्प
                  </p>
                </div>
                <div className="flex justify-center">
                  <img alt="" src={digitalIndia} className="w-20 h-auto" />
                </div>
                <div className="col-span-3">
                  <img alt="" src={coverPage} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-center text-white text-lg font-bold  bg-opacity-40 px-4 py-2 rounded">
                      उच्चदाब संयोजन पोर्टल
                    </h1>
                  </div>
                </div>
              </div>

              <div className=" grid grid-cols-[auto_2fr_auto] mx-0 sm:mx-4 md:mx-20 lg:mx-60 items-center rounded-bl-lg rounded-br-lg border border-solid bg-sky-900 overflow-hidden"></div>
            </div>
          </div>
        </div>
        <div className="w-1/5  p-4">
          <div className="counts relative rounded-sm shadow-lg p-2 text-center mb-5 bg-[#E6E6FF]">
            Track Application Status
            <br></br>
            आवेदन की स्थिति जानें
          </div>

          <div className="counts relative rounded-sm shadow-lg p-2 text-center mb-5">
            Track Application Status
            <br></br>
            आवेदन की स्थिति जानें
          </div>

          <div className="counts relative rounded-sm shadow-lg p-2 text-center mb-4">
            Track Application Status
            <br></br>
            आवेदन की स्थिति जानें
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
