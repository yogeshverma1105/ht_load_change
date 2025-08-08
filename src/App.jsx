import { useState } from 'react';
import '../src/css/style.css';
import './App.css';
import HomeLayout from './component/HomeLayout';
import Body from './component/Body';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import LoadChangeReg from './component/loadChange/LoadChangeReg';
import ShowAndUpdateDetails from './component/loadChange/ShowAndUpdateDetails';
import NameTransferReg from './component/nameTransfer/NameTransferReg';
import GreenTariffReg from './component/greenTraiff/GreenTariffReg';
import LoadChangePay from './component/loadChange/LoadChangePay';
import BillDeskPayment from './component/BillDesk/BillDeskPayment';
import DashboardLayout from './component/Dashboard/DashboardLayout';
import ApplicationStatus from './component/Dashboard/ApplicationStatus';
import ApplicantStatus from './component/Dashboard/UserDashboard/ApplicantStatus';
import TrackApplicationStatus from './component/loadChange/TrackApplicationStatus';
import Login from './component/Login/Login';
import PaddingApplication from './component/Dashboard/PaddingApplication';
import ApplicantPaddingApplication from './component/Dashboard/UserDashboard/ApplicantPaddingApplication';
import LoadSanction from './component/Dashboard/LoadSanction';
import LoadSurvey from './component/Dashboard/LoadSurvey';
import LoadAgreement from './component/Dashboard/LoadAgreement';
import LoadChangeInstruction from './component/loadChange/LoadChangeInstruction';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Body />} />
            <Route path="/NewServiceConnection" element={<LoadChangeReg />} />
            <Route path="/ht-load-change/" element={<LoadChangeInstruction />} />
            <Route
              path="/ht-load-change/consumer-registration/:consumerId"
              element={<LoadChangeReg />}
            />
            <Route path="/ht-load-change/update/:application_no" element={<LoadChangeReg />} />
            <Route path="/ht-load-change/Details" element={<LoadChangePay />} />
            <Route
              path="/ht-load-change/pay-by-online/:application_no"
              element={<BillDeskPayment />}
            />
            <Route path="/NameTransfer" element={<NameTransferReg />} />
            <Route path="/GreenTariff" element={<GreenTariffReg />} />
            <Route
              path="/department-login"
              element={<Login login_by="Department" label="Employee Id" />}
            />
            <Route
              path="/applicant-login"
              element={<Login login_by="Applicant" label="Application No" />}
            />
            <Route
              path="ht-load-change/track_application_status"
              element={<TrackApplicationStatus />}
            />
          </Route>
          {/* 🆕 Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ApplicationStatus />} />
            <Route path="/dashboard/padding_application" element={<PaddingApplication />} />
            <Route path="/dashboard/pending_for_load_sanction/:id" element={<LoadSanction />} />
            <Route path="/dashboard/pending_for_survey/:id" element={<LoadSurvey />} />
            <Route
              path="/dashboard/pending_for_agreement_finalization/:id"
              element={<LoadAgreement />}
            />
          </Route>
          <Route path="/user-dashboard" element={<DashboardLayout />}>
            <Route index element={<ApplicantStatus />} />
            <Route
              path="/user-dashboard/applicant-padding-application"
              element={<ApplicantPaddingApplication />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
