import React from 'react';
import banner from '../../assets/image/banner.png';
export default function BannerImg() {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src={banner}
          className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
        />
      </div>
    </>
  );
}
