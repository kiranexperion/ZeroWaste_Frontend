import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";
import classes from './Bookingstatus.module.css'



function BookingStatus() {
 
    useEffect(()=>{
      let auth =  sessionStorage.getItem('jwthouseowner');
       fetch('http://127.0.0.1:8000/zerowaste/houseowner/bookingstatus/',{
        method: 'GET',
        headers:{
          Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
           },
          })
          .then(response => {
                console.log("request: ", response);
                  return response.json();
                       
                  })
                  .then((res)=>{
                        console.log("response: ", res);
                        setData(res);
                  })
         
 
    },[])
    const [data, setData] = useState([]);
    const columns = [
      {
        name: "Booked Date",
        selector: (row) => row.bookingdate,
      },
      {
        name: "Collection Date",
        selector: (row) => row.collectiondate,
      },
      {
        name: "Waste Type",
        selector: (row) => row.wastetype,
      },
      {
        name: "Supervisor Name",
        selector: (row) => row.supervisorname,
      },
      {
        name: "Status",
        selector: (row) => row.status,
      },
    ]




  return (
    <div className={classes.table}>
    <h3>Booking Status</h3>
    <DataTable columns={columns} data={data} pagination />
     
    </div>
  );
}

export default BookingStatus;