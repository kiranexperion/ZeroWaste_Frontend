import React, { useEffect, useState } from 'react';
import classes from './Bookinghistory.module.css';
import DataTable from "react-data-table-component";

function History() {
  const [data, setData] = useState([]);
 

 
    useEffect(()=>{
      let auth =  sessionStorage.getItem('jwthouseowner');
       fetch('http://127.0.0.1:8000/zerowaste/houseowner/bookinghistory/',{
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
              setData(res)
           
            })    
    },[])
    const columns = [
      {
        name: "Booking Date",
        selector: (row) => row.bookingdate,
      },
      {
        name: "Collected Date",
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
    ]


  return (
    <div className={classes.table}>
    <h3>BOOKING HISTORY</h3>
    <DataTable columns={columns} data={data} pagination />
     
    </div>
  );
}

export default History;