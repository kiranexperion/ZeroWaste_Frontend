import { useRef , useContext , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Municipalitylogin.module.css';
import AuthContext from '../../store/auth-context';

const MunicipalityLogin = () => {
  const [loginValidationErrorr, setloginValidationErrorr] = useState('');
  const [redirect, setRedirect] = useState(false);
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    fetch("http://127.0.0.1:8000/zerowaste/login/", {

      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        email :enteredEmail,
        password:enteredPassword,
 
      })
 
    })
 
      .then(response => {
        console.log("request: ", response);
        if(response.headers.redirect === true){
           setRedirect(true);
                  }
        return response.json();
      })
      .then(resJson => {
        console.log("responsesss: ", resJson);
        sessionStorage.setItem("jwt",resJson.jwt);
        authCtx.login(resJson.jwt);
        sessionStorage.setItem("role",resJson.role);

        if((resJson.status === 1)&&(resJson.role === 2)){
          // sessionStorage.setItem("jwtsuperadmin",resJson.jwt);
          navigate('/superadminservices');
        }
        else if((resJson.status === 1)&&(resJson.role === 3)){
          // sessionStorage.setItem("jwadmin",resJson.jwt);
          navigate('/municipalityservices');
        }
        else if((resJson.status === 1)&&(resJson.role === 4)){
          // sessionStorage.setItem("jwtsupervisor",resJson.jwt);
          navigate('/supervisorservices');
        }
        if( redirect === false ){
                   setloginValidationErrorr(resJson.detail); }
     })
  };
  return(
   <div className={classes.MunicipalityLogin}>
    <h1>Corporation Login</h1>
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            required
            ref={nameInputRef}
          />
      </div>
      <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        {loginValidationErrorr && <div className="errormessage">{loginValidationErrorr}</div>}
        <button type='submit' className={classes.button} >Login</button>
        </form>    
     
   </div>
 )
}
export default MunicipalityLogin;