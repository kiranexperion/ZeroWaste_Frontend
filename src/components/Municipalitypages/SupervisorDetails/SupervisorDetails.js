import React, {useEffect , useState , Fragment} from 'react';
import classes from './SupervisorDetails.module.css';
import SupervisorEdit from './SupervisorEdit';


const SupervisorDetails = () => {
    const [data, setData] = useState([]);
    const [editFormData, setEditFormData] = useState({});
    const [editDataId, setEditDataId] = useState(null);
    
    let auth =  sessionStorage.getItem('jwt');
      //API call
      useEffect(()=>{
      
        fetch('http://127.0.0.1:8000/zerowaste/corporation/supervisorsdetails/',{
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
             const responseData=res;
             const loadedUserDetails=[];
 
       for (const key in responseData){
         loadedUserDetails.push({
          a: responseData[key].firstname,
          b: responseData[key].lastname,
          c: responseData[key].email,
          d: responseData[key].phoneno,
          e: responseData[key].address,
          f: responseData[key].id,
          
          
         });
       }
       setData(loadedUserDetails);
           })
     },[data])
   
    
      const handleEditFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
    
        setEditFormData(newFormData);
      };
  
          const handleEditFormSubmit = (event) => {
            event.preventDefault();
        
            const editedData = {
              id:editFormData.f,
              email: editFormData.c,
              phoneno:editFormData.d,
              address: editFormData.e
              
              
            };
            console.log(editFormData.b)
            console.log(editedData)
            const newDatas = [...data,editFormData];
             fetch('http://127.0.0.1:8000/zerowaste/corporation/editsupervisor/',{
                method: 'PUT',
                body: JSON.stringify({
                                      id:editFormData.f,
                                      email: editFormData.c,
                                      phoneno: editFormData.d,
                                      address: editFormData.e
                                     
                                    }),
                headers:{ 
                  Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
                 },
                })
       
        
              newDatas[editDataId]  = editedData;
        
            setData(newDatas);
            setEditDataId(null);
          }
      
          const handleEditClick = (event,item ) => {
            event.preventDefault()
            setEditDataId(item.f);
            const formValues = {
              a: item.a,
              b: item.b,
              c: item.c,
              d:item.d,
              e:item.e,
              f:item.f,
              key:item.f
            };
            // console.log(formValues)
        
            setEditFormData(formValues);
            
          };console.log(editFormData)
        
          const handleCancelClick = () => {
            setEditDataId(null);
          };
  
      const deleteHandler = async(index) => {
        const response = await fetch('http://127.0.0.1:8000/zerowaste/corporation/deletesupervisor/', {
        method: 'POST',
        body: JSON.stringify({
          id: index,
        }),
        headers: {
          Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
        }
      });
    
      const message = await response.json();
      // console.log(data);
      console.log(index);
  
      const updateddata= data.filter(item => item.f !== index)
      setData(updateddata)
     
    };
    
  
return (
    <div className={classes.supervisor}>
      <h1 className={classes.supervisorhead}>Supervisor Details</h1>
        <div className={classes.supervisorform}>
        <form onSubmit={handleEditFormSubmit}>
        <table class='table'>
        {/* <Table striped bordered hover className='table'>  */} 
        {/* <table class='table'> */}
          <thead>
            <tr >
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Action</th>
             
            </tr>
          </thead>
          <tbody>
              {data.map((item) => (
                <Fragment>
                  {editDataId === item.f ? (
                    <SupervisorEdit
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick} />
                  ) : (
                    <tr>
                    <td>{item.a}</td>
                    <td>{item.b}</td>
                    <td>{item.c}</td>
                    <td>{item.d}</td>
                    <td>{item.e}</td>
                    <td >
                    <button type="button"  className={classes.button}  onClick={(event) => handleEditClick(event, item)}>Edit</button>
                    <button type="Button" className={classes.button}  onClick={() => deleteHandler(item.f)}>Delete</button>
                    </td>  
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
          </form>
         
          </div>
    </div>
    );
}
export default SupervisorDetails;