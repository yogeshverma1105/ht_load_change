import { useState } from 'react'
import '../src/css/style.css'
import './App.css'
import HomeLayout from './component/HomeLayout'
import Body from './component/Body'
import { BrowserRouter, Router,Routes,Route } from 'react-router-dom'
import LoadChangeReg from './component/loadChange/LoadChangeReg'
import ShowAndUpdateDetails from './component/loadChange/ShowAndUpdateDetails'
import NameTransferReg from './component/nameTransfer/NameTransferReg'
import GreenTariffReg from './component/greenTraiff/GreenTariffReg'
import LoadChangePay from './component/loadChange/LoadChangePay'

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeLayout />}>
            <Route index element={<Body/>} />
            <Route path="/NewServiceConnection" element={<LoadChangeReg />}/>
            <Route path="/LoadChange" element={<LoadChangeReg />}/>
            <Route path="/ht-load-change/edit/:consumerId" element={<ShowAndUpdateDetails />} />
            <Route path="/PayDetails" element={<LoadChangePay />}/>
            <Route path="/NameTransfer" element={<NameTransferReg />}/>
            <Route path="/GreenTariff" element={<GreenTariffReg />}/>
            </Route>
        </Routes>
  </BrowserRouter>
    
    </>
    
  )
}
export default App
