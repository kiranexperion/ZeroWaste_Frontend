import './allocatecollector.css';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DataTable from "react-data-table-component";

const WasteCollectionStatus = () => {
    const [data, setData] = useState([]);
    const [collection_date, setCollection_date] = useState('');
   

    const handleDate = (e) => {
      e.preventDefault();
      setCollection_date(e.target.value);
      getWasteCollectionStatus(e.target.value);
      console.log(e.target.value)
  }
  const getWasteCollectionStatus = (value)  => {
  let auth =  sessionStorage.getItem('jwt');
    //API call
    fetch("http://127.0.0.1:8000/zerowaste/corporation/collectionstatus/", {
      headers:{
        Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': auth,
         },
    method: "POST",
    body: JSON.stringify({
     
      collection_date: collection_date,
      // jwt:sessionStorage.getItem("jwt"),

     
    })
   
  })

    .then(response => {
      console.log("request: ", response);
      return response.json();
    })
    .then(resJson => {
      console.log("response: ", resJson);
      setData(resJson);
   

    })
    .catch(err => {
     
      console.log(err);
    });
  }
  useEffect(()=>{
     getWasteCollectionStatus(collection_date) 
     },[data])
  const columns = [
    {
      name: "Ward Name",
      selector: (row) => row.wardname,
    },
    {
      name: "Supervisor Name",
      selector: (row) => row.supervisor,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
  ]

    return (
          <div className="bookingstatus">
            <div className='statushead'>
            <h1 >Waste Collection Status</h1>
            </div>
           <div className="bookingstatusreport"> 

                <br></br>
                <div className="itemm">

         <label className="dropdownn"><b>Select Date:</b></label>
         <input type="date" id="slotdate" name="collection-date" min="2022-12-01" onChange={(e) =>handleDate(e)}/>
      </div>
      </div>
      <DataTable columns={columns} data={data} pagination />
      </div>
      );
   
    }

export default WasteCollectionStatus;



// import './allocatecollector.css';
// import classes from '../HouseOwner/Login.module.css';
// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// const WasteCollectionStatus = () => {
//     const [data, setData] = useState([]);
//     const [collection_date, setCollection_date] = useState('');
//     const [collectionData, setCollectionData] = useState([]);

//     const handleDate = (e) => {
//       e.preventDefault();
//       setCollection_date(e.target.value);
//       getWasteCollectionStatus(e.target.value);
//       console.log(e.target.value)
//   }
//   let auth =  sessionStorage.getItem('jwt');
//   const getWasteCollectionStatus = (value)  => {
//     //API call
//     fetch("http://127.0.0.1:8000/zerowaste/corporation/collectionstatus/", {
//       headers:{
//         Accept: 'application/json',
//                  'Content-Type': 'application/json',
//                  'Authorization': auth,
//          },
//     method: "POST",
//     body: JSON.stringify({
     
//       collection_date:value,
//       // jwt:sessionStorage.getItem("jwt"),

     
//     })
   
//   })

//     .then(response => {
//       console.log("request: ", response);
//       return response.json();
//     })
//     .then(resJson => {
//       console.log("response: ", resJson);
//       const collectionData=resJson;
//       const loadedCollectionDetails=[];
//       // setCollectionData(resJson.data)

//       for (const key in collectionData){
//         loadedCollectionDetails.push({
//           a: collectionData[key].wardname,
//           b: collectionData[key].supervisor,
//           c: collectionData[key].status,
         
//         });
//       }
//       setData(loadedCollectionDetails);

//     })
//     .catch(err => {
     
//       console.log(err);
//     });
//     //setCollectorData();
//   }
//     return (
//           <div className="bookingstatus">
//             <div className='statushead'>
//             <h1 >Waste Collection Status</h1>
//             </div>
//            <div className="bookingstatusreport"> 

//                 <br></br>
//                 <div className="itemm">

//          <label className="dropdownn"><b>Select Date:</b></label>
//          <input type="date" id="slotdate" name="collection-date" min="2022-12-01" onChange={(e) =>handleDate(e)}/>
//       </div>
//       </div>
//       <div className="tablereport">
//             <table class="table">
//               <thead>
//                 <tr>
//                    <th>Ward Name</th>
//                   <th> Supervisor Name</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data?.map((item, index) =>(
//                     <tr key={index}>
//                       <td>{item.a}</td>
//                       <td>{item.b}</td>
//                       <td>{item.c}</td>
//                       </tr>
                     
//                       ))}
//               </tbody>
//               </table>
//               </div>
//         </div>
//       );
   
//     }

// export default WasteCollectionStatus;
