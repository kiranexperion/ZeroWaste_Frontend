import './allocatecollector.css';
import classes from '../HouseOwner/Login.module.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
const AllocateCollector = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [wardData, setWardData] = useState();
    const [superviserData, setSuperviserData] = useState();
    const [wardno, setWardNo] = useState('');
    const [supervisor_id, setSuperviser] = useState('');
    const [collectionDate, setCollectionDate] = useState('');
    const [collectorData, setCollectorData] = useState([]);
    let role = sessionStorage.getItem('role');
    let auth =  sessionStorage.getItem('jwt');
    const submitHandler = (event) => {
      fetch("http://127.0.0.1:8000/zerowaste/corporation/collectorallocation/", {   //API CALL FOR COLLECTION DETAILS
        headers:{
          Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
           },
      method: "POST",
      body: JSON.stringify({
        wardno:wardno,
        supervisor_id:supervisor_id,
        collection_date:collectionDate,
        status: "Collector Allotted",
      })
     
    })
      .then(response => {
        console.log("request: ", response);
        return response.json();
      })
      .then(resJson => {
        console.log("response: ", resJson);
        console.log("status",resJson.status);
        if((resJson.status === 1)&&(role === 2))
        {
          navigate('/superadminservices'); 
        }
        if((resJson.status === 1)&&(role === 3))
        {
          navigate('/municipalityservices'); 
        }
  
      })
      .catch(err => {
       
        console.log(err);
      });
    }
    const handleDate = (e) => {
      e.preventDefault();
      setCollectionDate(e.target.value);
      console.log(e.target.value)
  }
  useEffect(()=>{
    getWardData();
  },[]);
  useEffect(()=>{
    getSuperviserData();
  },[]);
  const getWardData = () => {
    fetch("http://127.0.0.1:8000/zerowaste/wards/",
    {
      method: "GET",
    }).then((response) => {
       
        return response.json();
      })
      .then(function (data) {
        setWardData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const handleSupervisorData =(e)=> {
    e.preventDefault();
    setSuperviser(e.target.value);
    console.log("supervisor",e.target.value)
  }
  const getSuperviserData = () => {
    fetch("http://127.0.0.1:8000/zerowaste/corporation/supervisorslist/",
    {
      method: "GET",
    }).then((response) => {
        return response.json();
      })
      .then(function (data) {
        setSuperviserData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  const handleWardno =(e)=> {
    e.preventDefault();
    setWardNo(e.target.value);
    getCollectorDetails(e.target.value);
    console.log(e.target.value)
  }
  
  const getCollectorDetails = (value)  => {
    //API call
    fetch("http://127.0.0.1:8000/zerowaste/corporation/collectorlist/", {
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': auth,
         },
    method: "POST",
    body: JSON.stringify({
      wardno:value,
    })
   
  })

    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);
      setCollectorData(resJson.data)

    })
    .catch(err => {
     
      console.log(err);
    });
  }
    useEffect(()=>{
      const fetchCollectorDetails = async () => {
       const response=await fetch(
         'http://127.0.0.1:8000/zerowaste/corporation/collectorlist/'
       );
       if (!response.ok){
        throw  new Error('something went wrong!');
       }
      const responseData=await response.json();
      const loadedCollectorDetails=[];
      for (const key in responseData){

        loadedCollectorDetails.push({
          firstname: responseData[key].firstname,
          lastname: responseData[key].lastname,
          email: responseData[key].email,
          phoneno: responseData[key].phoneno,
          address: responseData[key].address,

        });

      }

      setData(loadedCollectorDetails);
    };

    fetchCollectorDetails().catch((error) => {

    })  

    },[])
    return (
          <div className="bookingstatus">
            <div className='statushead'>
            <h1 >Allocate Collector</h1>
            </div>
           <div className="bookingstatusreport"> 
               <label className="itemm">Ward Name :
                <div className="dropdown">
                <select onChange={(e) => handleWardno(e)} placeholder="Select Ward Number" oncl
                >
                    {wardData?.map(ward => {
                    return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
                     })}
                 </select>
                </div></label> 
                <label className="itemm">Supervisor :
                <div className="dropdown">
                <select onChange={(e) => handleSupervisorData(e)} placeholder="Select Supervisor"
                >
                    {superviserData?.map(superviser => {
                    return (<option key={superviser.id} value={superviser.id}>{superviser.name}</option>);
                     })}
                 </select>
                </div></label> 
                <br></br>
                <div className="itemm">

         <label className="dropdownn"><b>Select Date:</b></label>
         <input type="date" id="slotdate" name="collection-date" min="2022-12-01" onChange={(e) =>handleDate(e)}/>
      </div>
      </div>
      <div className="tablereport">
            <table class="table">
              <thead>
                <tr>
                   <th>Collector First Name</th>
                  <th> Last Name</th>
                  <th> Email</th>
                  <th> Phone Number</th>
                  <th> Address</th>
                </tr>
              </thead>
              <tbody>
                {collectorData?.map((item, index) =>(
                    <tr key={index}>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneno}</td>
                      <td>{item.address}</td>
                      </tr>
                     
                      ))}
              </tbody>
              </table>
              </div>
              <button type="submit" onClick={submitHandler}>Allocate Collector </button>
        </div>
      );
   
    }

export default AllocateCollector;