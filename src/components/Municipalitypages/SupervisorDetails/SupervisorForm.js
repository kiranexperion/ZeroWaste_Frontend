import React, {useRef} from "react";
import classes from './SupervisorForm.module.css';

 const SupervisorForm = () => {
    const firstNameInputRef = useRef();
    const lastNameInputRef = useRef();
    const emailInputRef = useRef();
    const phoneNoInputRef = useRef();
    const addressInputRef = useRef();

    let auth =  sessionStorage.getItem('jwt');

    async function addSupervisorHandler(event) {
        event.preventDefault();
        
        const user = {
            firstname: firstNameInputRef.current.value,
            lastname: lastNameInputRef.current.value,
            email: emailInputRef.current.value,
            phoneno: phoneNoInputRef.current.value,
            address: addressInputRef.current.value,
        };
       
        console.log(user);
        const myJSON = JSON.stringify(user);
        console.log(myJSON);

          const response = await fetch('http://127.0.0.1:8000/zerowaste/corporation/addsupervisor/', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            Accept: 'application/json',
                   'Content-Type': 'application/json',
                   'Authorization': auth,
          }
        }) .then(res => {
            if (res.ok) {
                console.log("resdata",res);
            }
        })
        .then(resJson => {
            console.log("data",resJson)
            if (resJson.status === 1) {
                alert("Supervisor added successfully.")
            }
        });
        const data = await response.json();
        console.log(data);
      }
      return(
        <div className={classes.forms}>
        <form onSubmit={addSupervisorHandler}>
            <div className={classes.wrapp}></div>
                <div className={classes.one}>
                    <div className={classes.control}>
                    <h3>
                          Add New Supervisor
                    </h3>
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
                </div>
                        <button>Submit</button>
                    </form>
            </div>
 
      )
    }
    export default SupervisorForm;