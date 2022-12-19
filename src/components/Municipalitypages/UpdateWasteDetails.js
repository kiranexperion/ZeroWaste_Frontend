import React, { useEffect, useState, Fragment } from 'react';
import EditableRow from './EditableRow';
import classes from './UpdateWasteDetails.module.css';



const  UpdateWasteDetails = () => {
  const [data, setData] = useState([]);
  const [addFormData, setAddFormData] = useState({})
  const [editFormData, setEditFormData] = useState({});
  const [editDataId, setEditDataId] = useState(null);

    useEffect(()=>{
      // const fetchUserDetails = async () => {
      //  const response=await
       fetch('http://127.0.0.1:8000/zerowaste/wastelist/',{
        method: 'GET',
        headers:{
                   'Content-Type': 'application/json',
           },
          })
          .then(response => {
            console.log("request: ", response);
            return response.json();
           
          })
          .then((res)=>{
            console.log("response: ", res);
            const responseData=res;
            const loadedUserDetails=[];

      for (const key in responseData){
        loadedUserDetails.push({
          a: responseData[key].waste_type,
          b: responseData[key].charge,
          c: responseData[key].id,
         
        });
      }
      setData(loadedUserDetails);
          })
    },[data])

  
    const handleAddFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
  
      setAddFormData(newFormData); 
    };
  
    const handleEditFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;
  
      setEditFormData(newFormData);
    };
  
    const handleAddFormSubmit = async(event) => {
      event.preventDefault();
  
      // const newData = {
      //   "data_id":data.id,
      //   "data_charge": addFormData.charge}
      
      
      const addResponse = await fetch(
          'http://127.0.0.1:8000/zerowaste/corporation/addwaste/',{
               method:"POST", 
               body:JSON.stringify({
                  waste_type: addFormData.waste_type,
                  charge: addFormData.charge,
               }),  
               headers: {
                 'content-type':'application/json'
               }},
               
                 
        );
              }

        const handleEditFormSubmit = (event) => {
          event.preventDefault();
      
          const editedData = {
            id:editFormData.c,
            charge: editFormData.b,
            
          };
          console.log(editFormData.b)
          console.log(editedData)
          const newDatas = [...data,editFormData];
           fetch('http://127.0.0.1:8000/zerowaste/corporation/editwaste/',{
              method: 'PUT',
              body: JSON.stringify({id:editFormData.c,
                                    charge: editFormData.b}),
              headers:{ 'Content-Type': 'application/json',
               },
              })
     
      
            newDatas[editDataId]  = editedData;
      
          setData(newDatas);
          setEditDataId(null);
        }
    
        const handleEditClick = (event,item ) => {
          event.preventDefault()
          setEditDataId(item.c);
          const formValues = {
            a: item.a,
            b: item.b,
            c: item.c,
            key:item.c
          };
          // console.log(formValues)
      
          setEditFormData(formValues);
          
        };console.log(editFormData)
      
        const handleCancelClick = () => {
          setEditDataId(null);
        };

    const deleteHandler = async(index) => {
      const response = await fetch('http://127.0.0.1:8000/zerowaste/corporation/deletewaste/', {
      method: 'POST',
      body: JSON.stringify({
        id: index,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const message = await response.json();
    // console.log(data);
    console.log(index);

    const updateddata= data.filter(item => item.c !== index)
    setData(updateddata)
   
  };

  return (
    <div>
     
        <h1 className={classes.statushead}>Waste Details</h1>
        <div className={classes.bookingstatusreport}>
        <form onSubmit={handleEditFormSubmit}>
        <table class='table'>
        {/* <Table striped bordered hover className='table'>  */} 
        {/* <table class='table'> */}
          <thead>
            <tr >
              <th>Waste Type</th>
              <th>Charge</th>
              <th>Action</th>
             
            </tr>
          </thead>
          <tbody>
              {data.map((item) => (
                <Fragment>
                  {editDataId === item.c ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick} />
                  ) : (
                    <tr key={item.c}>
                    <td>{item.a}</td>
                    <td>{item.b}</td>
                    <td >
                    <button type="button"  className={classes.button}  onClick={(event) => handleEditClick(event, item)}>Edit</button>
                    <button type="Button" className={classes.button}  onClick={() => deleteHandler(item.c)}>Delete</button>
                    </td>  
                    </tr>
                    // <ReadOnlyRow
                    //   support={support}
                    //   handleEditClick={handleEditClick}
                    //   handleDeleteClick={handleDeleteClick} />
                  )}
                </Fragment>
              ))}
            </tbody>
          {/* <tbody>
            {data
              .map((item, index) =>(
                <tr key={index}>
                  <td>{item.a}</td>
                  <td>{item.b}</td>
                  <td>
                    {item.c}
                  <button type="Button" onClick={() => handleEditClick(item.c)} >Edit</button>

                  <button type="Button" onClick={() => deleteHandler(item.c)}>Delete</button>
                  </td>  
                  </tr>))}
                  {data.map((item) =>{
                         {editDataId === item.c && (
                          <EditableRow
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick} />
                        )} })}    
          </tbody> */}
          </table>
          </form>
          <form className="supportcard">
            <input
              type="text"
              name="waste_type"
              required="required"
              placeholder="Enter the Waste"
              onChange={handleAddFormChange} /><br />
            <input
              type="text"
              name="charge"
              required="required"
              placeholder="Enter the Charge"
              onChange={handleAddFormChange} /><br />
              <button type="button" className={classes.buttonthree} onClick={handleAddFormSubmit}>Add</button>
              </form>
         
          </div>
    </div>
  );
  
}

export default UpdateWasteDetails;