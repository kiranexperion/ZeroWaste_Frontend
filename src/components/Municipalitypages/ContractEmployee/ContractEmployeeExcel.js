import React, {useState , useEffect , useRef} from "react";
import EmployersTemplate from "./EmployersTemplate";
import classes from './ContractEmployeeExcel.module.css';



const ContractEmployeeExcel = () => {
    
    const [selectedFile, setSelectedFile] = useState({})
    const [wardData, setWardData] = useState();
    const [wardNo, setWardNo] = useState('');
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneNoInputRef = useRef();
    const addressInputRef = useRef();

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };
    

    useEffect(()=>{
        getWardData();
      },[]);
      
      let auth =  sessionStorage.getItem('jwt');
    
    async function addEmployeeHandler(event) {
        event.preventDefault();
        // console.log(districtRef);
        const user = {
            firstname: firstNameInputRef.current.value,
            lastname: lastNameInputRef.current.value,
            email: emailInputRef.current.value,
            phoneno: phoneNoInputRef.current.value,
            address: addressInputRef.current.value,
            wardno: wardNo,
        };
        console.log(user);
        const myJSON = JSON.stringify(user);
        console.log(myJSON);
        const response = await fetch('http://127.0.0.1:8000/zerowaste/corporation/addcollector/', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
          }
        }) .then(res => {
            if (res.ok) {
                console.log(res.data);
                alert("Employee Added successfully.")
            }
        });
        
        const data = await response.json();
        console.log(data);
      }
      

      const getWardData = () => {
        fetch("http://127.0.0.1:8000/zerowaste/wards/", 
        {
          method: "GET",
        }).then((response) => {
            return response.json();
          })
          .then(function (data) {
            setWardData(data);
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          }); 
      }

      const handleWardno =(e)=> {
        e.preventDefault();
        setWardNo(e.target.value);
        console.log(e.target.value)
      }


      const onFileUpload = (e) => {
        e.preventDefault();
        setSelectedFile(e.target.files)
        const formData = new FormData()
        formData.append('file',selectedFile)
        console.log(formData)
        fetch('http://127.0.0.1:8000/zerowaste/corporation/employeelist/', {
            method: 'POST',
            body:formData,
            headers: {
                
                       'Authorization': auth,
              }
        })
        .then(res => {
            if (res.ok) {
                console.log(res.data);
                alert("File uploaded successfully.")
            }
        });
    }; 
    const fileData = () => {
        if (selectedFile) {
            return (
                <div className='detailsShown'>
                    {/* <h6>File Details:</h6> */}
                    <p>File Name: {selectedFile.name}</p><br></br>
                    {/* <p className='date'>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p> */}
                </div>
            );
        }
  
  
        else {
          return (
            <div>
                <br />
                <h6>Choose before Pressing the Upload button</h6>
            </div>
        );
    }
    }
    return(
        
        <div className={classes.emp}>  
        <h3>Add Contract Employee</h3>     
        <div className={classes.wrap}>
        <div className={classes.manage}>
        <div className={classes.upload}>
            {/* <h3>
                Add Multiple Employees
            </h3> */}
            <div>
                <br></br>
                <input type="file" onChange={onFileChange} />
                <button onClick={onFileUpload}>
                    Upload
                </button>
            </div>
            {/* <div className='filedata'>{fileData()}</div> */}
         
          <EmployersTemplate></EmployersTemplate>
        </div>
        </div>
        
        <div className={classes.forms}>
                    <form onSubmit={addEmployeeHandler}>
                        <div className={classes.wrapp}></div>
                            <div className={classes.one}>
                                <div className={classes.control}>
                                {/* <h3>
                                      Add New Employee
                                </h3> */}
                                    <label htmlFor='firstname'>FirstName:</label>
                                    <input type='firstname' id='firstname' required ref={firstNameInputRef}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='lastname'>LastName: </label>
                                    <input type='lastname' id='lastname' required ref={lastNameInputRef}/>
                                </div>
                                <div className={classes.control}>
                                    <label htmlFor='email'>Email:</label>
                                    <input type='email' id='email' required ref={emailInputRef}/>
                                </div>
                                <div className={classes.control}>
                                     <label htmlFor='phoneno'>PhoneNo:</label>
                                    <input type='phoneno' id='phoneno' required ref={phoneNoInputRef}/>
                                 </div>
                            <div className={classes.control}>
                                <label htmlFor='address'>Address:</label>
                                <input type='address' id='address' required ref={addressInputRef}/>
                            </div>
                            <label className={classes.item}>Ward:
                              <div className={classes.dropdown}>
                                  <select onChange={(e) => handleWardno(e)}
                                    required
                                     placeholder="Select Ward Number">
                                    {wardData?.map(ward => {
                                    return (<option key={ward.wardno} value={ward.wardno}>{ward.wardname}</option>);
                                    })}
                                    </select>
                                </div>
                            </label>
                            </div>
                        <button>Submit</button>
                    </form>
            </div>
            
        </div>
    </div>
    )
}
export default ContractEmployeeExcel;