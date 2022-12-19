import classes from './SupervisorLandingPage.module.css';
import img4 from '../../../Assets/Municipality/SupervisorDetails/img4.png'
import img1 from '../../../Assets/Municipality/SupervisorDetails/img1.png'


import { NavLink } from 'react-router-dom';

const SupervisorLandingPage = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.writeup}>
       
        
      </div>
      
      <div className={classes.logolinks}>
        <ul>
          <li>
            <NavLink to = "/Supervisordetails" className={classes.usertext}>
              <img src={img1}/> 
              <h4>Supervisor Details</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/Supervisorform' className={classes.usertext}>
             <img src={img4}/>
              <h4>Add Supervisor</h4>
            </NavLink>
          </li>
          </ul>
      </div>

    </div> 
  );
};
export default SupervisorLandingPage;