import React, {useEffect , useState , Fragment} from 'react';
import classes from './ContractEmployee.module.css';
import ContractEmployeeEdit from './ContractEmployeeEdit';



const ContractEmployee = () => {
    const [wardNo, setWardNo] = useState('');
    const [wardData, setWardData] = useState();
    const [data, setData] = useState([]);
    const [editFormData, setEditFormData] = useState({});
    const [editDataId, setEditDataId] = useState(null);
    const [collectorData, setCollectorData] = useState([]);
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
      getCollectorDetails(e.target.value);
      console.log(e.target.value)
    }
    let auth =  sessionStorage.getItem('jwt');
    console.log(auth);
    console.log(wardNo);
    const getCollectorDetails = (value)  => {
      //API call FOR COLLECTOR LIST
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
        console.log("responsessss: ", resJson.data);
        setCollectorData(resJson.data)
        const loadedUserDetails=[];
        for (const key in resJson.data){
          loadedUserDetails.push({
            a: resJson.data[key].firstname,
            b: resJson.data[key].lastname,
            c: resJson.data[key].email,
            d: resJson.data[key].phoneno,
            e: resJson.data[key].address,
            f: resJson.data[key].id,
           
          });
        }
        setData(loadedUserDetails);
  
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
            };
            fetchCollectorDetails().catch((error) => {
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
             fetch('http://127.0.0.1:8000/zerowaste/corporation/editcollector/',{
                method: 'PUT',
                body: JSON.stringify({id:editFormData.f,
                                      email: editFormData.c,
                                      phoneno: editFormData.d,
                                      address: editFormData.e
                                     
                                    }),
                headers:{ 'Content-Type': 'application/json',
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
        
            setEditFormData(formValues);
            
          };console.log(editFormData)
        
          const handleCancelClick = () => {
            setEditDataId(null);
          };
  
      const deleteHandler = async(index) => {
        const response = await fetch('http://127.0.0.1:8000/zerowaste/corporation/deletecollector/', {
        method: 'POST',
        body: JSON.stringify({
          id: index,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      const message = await response.json();
  
      const updateddata= data.filter(item => item.f !== index)
      setData(updateddata)
     
    };
    
  
return (
    <div className={classes.contractEmployee}>
      <h1 className={classes.statushead}>Contract Employees</h1>
        <label className={classes.item}>Ward Number :
            <div className={classes.dropdown}>
                <select onChange={(e) => handleWardno(e)}
                placeholder="Select Ward Number"
                >
                {wardData?.map(ward => {
                return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
                 })}
                </select>
            </div>
        </label>
        <div className={classes.bookingstatusreport}>
        <form onSubmit={handleEditFormSubmit}>
        <table class='table'>
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
                    <ContractEmployeeEdit
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
export default ContractEmployee;