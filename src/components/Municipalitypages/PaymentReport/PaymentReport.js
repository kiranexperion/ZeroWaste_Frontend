import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import classes from './PaymentReport.module.css';





function PaymentReport() {
  const [paymentReport, setPaymentReport] = useState([]);
 
    useEffect(()=>{
      let auth =  sessionStorage.getItem('jwt');
      // const fetchUserDetails = async () => {
      //  const response=await
       fetch('http://127.0.0.1:8000/zerowaste/corporation/paymentreport/',{
        method: 'GET',
        headers:{
          Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
           },
          })
          .then(response => {
       
      setPaymentReport(response.data);
          })
    },[])
    

    const columns = [
      {
        name: "First Name",
        selector: (row) => row.firstname,
      },
      {
        name: "Last Name",
        selector: (row) => row.lastname,
      },
      {
        name: "Phone Number",
        selector: (row) => row.phoneno,
      },
      {
        name: "Address",
        selector: (row) => row.address,
      },
      {
        name: "Ward Number",
        selector: (row) => row.wardno,
      },
      {
        name: "Last-Payment Date",
        selector: (row) => row.wardno,
        sortable : true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
      },
    ]




  return (
    <div className={classes.report}>
    <h3>PAYMENT REPORT</h3>
    <DataTable columns={columns}
     data={paymentReport} 
     pagination 
     highlightOnHover/>
    </div>
  );
}

export default PaymentReport;