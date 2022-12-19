
import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/HouseOwner/Login";
import AuthContext from "./store/auth-context";
import Supervisorservices from "./components/Municipalitypages/SuperviserServices";
import { useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Msignin from "./components/Municipalitypages/Municipalitylogin";
import Slotbooking from "./components/pages/SlotBooking";
import Houseownerservices from "./components/HouseOwner/Houseownerservices";
import Municipalityservices from "./components/Municipalitypages/Municipalityservices";
import Bookingstatusreport from "./components/Municipalitypages/WasteReport";
import SuperAdminServices from "./components/Municipalitypages/SuperAdminServices";
import ContractEmployeeExcel from "./components/Municipalitypages/ContractEmployee/ContractEmployeeExcel";
import UpdateWasteDetails from "./components/Municipalitypages/UpdateWasteDetails";
import ContractEmployee from "./components/Municipalitypages/ContractEmployee/ContractEmployee";
import SupervisorLandingPage from "./components/Municipalitypages/SupervisorDetails/SupervisorLandingPage";
import SupervisorForm from "./components/Municipalitypages/SupervisorDetails/SupervisorForm";
import SupervisorDetails from "./components/Municipalitypages/SupervisorDetails/SupervisorDetails";
import PaymentHistory from "./components/HouseOwner/Payment/PaymentHistory";
import PaymentReport from "./components/Municipalitypages/PaymentReport/PaymentReport";
// import otpValidation from "./components/Projects/otpValidation"
// import Register from "./components/Projects/Register";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingHistory from "./components/HouseOwner/BookingHistory";
import Slotbooked from "./components/pages/Slotbooked";
import Municipalitylogin from "./components/Municipalitypages/Municipalitylogin"
import Bookingstatus from "./components/HouseOwner/Bookingstatus";
import AllocateCollector from "./components/Municipalitypages/AllocateCollector"
import WasteCollectionUpdate from "./components/Municipalitypages/WasteCollectionUpdate";
import WasteCollectionStatus from "./components/Municipalitypages/WasteCollectionStatus"
import Payment from "./components/HouseOwner/Payment";
import Invoice from "./components/HouseOwner/Invoice";
import { CgLayoutGrid } from "react-icons/cg";
import ContractEmployeeservices from "./components/Municipalitypages/ContractEmployee/ContractEmployeeservices";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn);
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
      <Navbar /> 
        <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/municipalitylogin" element={<Municipalitylogin />} />
        <Route path="/Msignin" element={<Msignin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/slotbook" element={<Slotbooking />} />
        <Route path="/slotbooked" element={<Slotbooked />} />      
        <Route path="/bookingstatusreport" element={<Bookingstatusreport />} />
        <Route path="/bookinghistory" element={<BookingHistory />} />
        <Route path="/bookingstatus" element={<Bookingstatus />} />
        <Route path="/houseownerservices" element={<Houseownerservices />} />
        <Route path="/municipalityservices" element={<Municipalityservices/>} />
        <Route path="/bookinghistory" element={<BookingHistory />} />
        {/* <Route path="/bookingstatus" element={<Bookingstatus />} />  */}
        <Route path="/allocatecollector" element={<AllocateCollector />} /> 
        <Route path="/superadminservices" element={<SuperAdminServices />} /> 
        <Route path="/supervisorservices" element={<Supervisorservices />} />
        <Route path="/wastecollectionupdate" element={<WasteCollectionUpdate />} />
        <Route path="/wastecollectionstatus" element={<WasteCollectionStatus />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contractemployee" element={<ContractEmployee />} />
        <Route path="/contractemployeeExcel" element={<ContractEmployeeExcel />} />
        <Route path="/updatewastedetails" element={<UpdateWasteDetails />} />
        <Route path="/contractemployeeservices" element={<ContractEmployeeservices />} />
        {/* <Route path="/invoice" element={<Invoice/>} /> */}
        <Route path="/invoice" element={<Invoice />} />
        {/* <Route path="/otpvalidation" element={<otpValidation />} />     */}
        
        <Route path="/Supervisorlandingpage" element={<SupervisorLandingPage />} />
        <Route path="/Supervisorform" element={<SupervisorForm />} />
        <Route path="/Supervisordetails" element={<SupervisorDetails />} />
        <Route path="/paymenthistory" element={<PaymentHistory />} />
        <Route path="/paymentreport" element={<PaymentReport />} />
        

        </Routes>
        <Footer />
      </div>
    </Router>
    </div>
  );
}

export default App;
