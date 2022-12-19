import React, { useEffect, useState , useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './wastecollectionupdate.css';


const WasteCollectionUpdate = (props) => {
  let auth =  sessionStorage.getItem('jwt');
  const navigate = useNavigate();
  var validated =false
  const wardInputRef = useRef();
  const [wardData, setWardData] = useState();
const [collectionDate, setCollectionDate] = useState('');
const [wardno, setWardNo] = useState('');
const [status, setStatus] = useState();

const current = new Date();
  const collection_date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
  console.log(collection_date);
useEffect(()=>{
  getWardData();
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
const handleWardno =(e)=> {
  e.preventDefault();
  setWardNo(e.target.value);
  console.log(e.target.value)
  // console.log(wardno)
}
const handleStatusProgress = () => {

    fetch("http://127.0.0.1:8000/zerowaste/corporation/collectionstatusupdate/", {
    headers: {
      Accept: 'application/json',
               'Content-Type': 'application/json',
               'Authorization': auth,
       },
    method: "POST",
    body: JSON.stringify({
      status: "In Progress",
      collection_date:collection_date,
      wardno:wardno,

     
    })
   
  })

  console.log(sessionStorage.getItem('jwt'))
    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);
      if(resJson.status === 1){
        navigate('/supervisorservices'); 
      }

    })
    .catch(err => {
     
      console.log(err);
    });

  //   console.log(firstnameValidationError,pincode);
}
const handleStatusCompleted = () => {

  fetch("http://127.0.0.1:8000/zerowaste/corporation/collectionstatusupdate/", {
    headers:{
      Accept: 'application/json',
               'Content-Type': 'application/json',
               'Authorization': auth,
       },
  method: "POST",
  body: JSON.stringify({
    status: "Collected",
    wardno: wardno,
    collection_date:collection_date,

   
  })
 
})

console.log(sessionStorage.getItem('jwt'))
  .then(response => {
    console.log("request: ", response);
    return response.json();
  })
  .then(resJson => {
    console.log("response: ", resJson);
    if(resJson.status === 1){
      navigate('/supervisorservices'); 
    }

  })
  .catch(err => {
   
    console.log(err);
  });

//   console.log(firstnameValidationError,pincode);
}


  return (
    <div className="register">
      <h2 className="registerhead">Waste Collection Update</h2>
      <div className="itemm">
      <label htmlFor='name'>Ward :
            <div className="dropdown">
              <select onChange={(e) => handleWardno(e)} required ref={wardInputRef} placeholder="Select Ward Number"
             >
        {wardData?.map(ward => {
            return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
        })}
      </select>
      </div></label>
         <div className='buttonss'> 
              <button type="submit" className='butn' id="two" onClick={handleStatusCompleted}>
                Collected
              </button>
              </div>
              <div className='button'> 
              <button type="submit" className='butnn' id="two" onClick={handleStatusProgress}>
                In Progress
              </button>
          </div>
          </div>
    </div>
  );
}
export default WasteCollectionUpdate;