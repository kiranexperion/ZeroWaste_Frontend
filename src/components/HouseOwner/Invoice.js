import React, { useEffect, useState } from 'react';
import classes from './Bookinghistory.module.css';
import DataTable from "react-data-table-component";
import { useNavigate } from 'react-router-dom';

function Bill() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalAmount, setTotalAmount] = useState('');

  const submitHandler = (event) => {
              navigate('/payment'); 
            }
    useEffect(()=>{
      let auth =  sessionStorage.getItem('jwthouseowner');
       fetch('http://127.0.0.1:8000/zerowaste/houseowner/invoice/',{
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
              setTotalAmount(res.grandtotal);
              console.log("total amount",res.grandtotal);
              setData(res.bill)
           
            })    
    },[])
    const columns = [
      {
        name: "Waste Type",
        selector: (row) => row.waste_type,
      },
      {
        name: "Quantity",
        selector: (row) => row.quantity,
      },
      {
        name: "Unit Price",
        selector: (row) => row.unit_price,
      },
      {
        name: "Total",
        selector: (row) => row.total,
      },
    ]


  return (
    <div>
      
    <div className={classes.table}>
    <h3>Bill</h3>
    <DataTable columns={columns} data={data} pagination />
    <h4>Total Amount= {totalAmount}</h4>
    <button type="submit" onClick={submitHandler}>Pay Now </button>    
    </div>
    
    </div>
  );
}

export default Bill;