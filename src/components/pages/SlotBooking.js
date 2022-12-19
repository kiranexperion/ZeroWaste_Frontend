import React, { useEffect, useState , useReducer} from 'react';
import './SlotBooking.css';
import { useNavigate } from 'react-router-dom';


const SlotBooking = (props) => {
  var validated =false
  const navigate = useNavigate();
const [id, setWasteid ] = useState('');
const [wasteData, setWasteData] = useState();
const [quantity, setQuantity] = useState();

const current = new Date();
  const booking_date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

useEffect(()=>{
  getWasteData();
},[]);

const getWasteData = () => {
  fetch("http://127.0.0.1:8000/zerowaste/wastelist/",
  {
    method: "GET",
  }).then((response) => {
      return response.json();
    })
    .then(function (data) {
      setWasteData(data);
    })
    .catch(err => {
      console.log(err);
    });
}

const handleQuantity = (e) => {
  setQuantity(e.target.value);
}
const handleWasteid =(e)=> {
  e.preventDefault();
  setWasteid(e.target.value);

}


  let auth =  sessionStorage.getItem('jwthouseowner');
const handleSubmit = () => {

    fetch("http://127.0.0.1:8000/zerowaste/houseowner/slotbooking/", {
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': auth,
         },
    method: "POST",
    body: JSON.stringify({
      
      waste_id:id,
      booking_date:booking_date,
      quantity: quantity,
     
    })
   
  })

    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);
      if(resJson.status ===1){
        navigate('/slotbooked'); 
      }

    })
    .catch(err => {
     
      console.log(err);
    });
}

  return (
    <div className="register">
      <h2 className="registerhead">Book Your Slot</h2>
     
      <label className="itemm"><b>Waste Type :</b>
       <div className="dropdown">
        <select className="dropdownn" onChange={(e) => handleWasteid(e)}>
          {wasteData?.map(waste => {
              return (<option key={waste.id} value={waste.id}>{waste.waste_type}</option>);
          })}
        </select>
      </div></label>
      <label className="itemm"><b>Add Quantity(in Kg) : </b>
      <input className="inputarea" type="number" name="quantity" onChange={(e) =>handleQuantity(e)}
        /> </label><h6>(1 Bucket = 1 Kg)</h6>
      <div className="itemm">
         <div className='buttons'> 
              <button type="submit" className='butn' id="two" onClick={handleSubmit}>
                Submit
              </button>
          </div>
          </div>
    </div>
  );
}
export default SlotBooking;