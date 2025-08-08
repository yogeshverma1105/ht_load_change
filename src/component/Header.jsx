import React from 'react';
import NavBar from './NavBar';
import Banners from './home/Banners';
import BannerImg from './home/BannerImg';

const Header = () => {
  return (
    <>
      <Banners />
      <BannerImg />
      <NavBar />
    </>
  );
};
export default Header;
