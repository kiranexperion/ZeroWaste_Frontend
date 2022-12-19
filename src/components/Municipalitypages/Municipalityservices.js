
import classes from './Municipalityservices.module.css';
import img from '../../Assets/Municipality/logo1.0.jpg'
import img1 from '../../Assets/Municipality/img1.png'
import img2 from '../../Assets/Municipality/icon3.png'
import img4 from '../../Assets/Municipality/icon4.png'
import img3 from '../../Assets/Municipality/logo1.2.jpg'


import { NavLink } from 'react-router-dom';

const Homeservices = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.writeup}>
       
        
      </div>
      
      <div className={classes.logolinks}>
        <ul>
          <li>
            <NavLink to = "/bookingstatusreport" className={classes.usertext}>
               <img src={img}/> 
              <h4>Allocate Collector</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/wastecollectionstatus' className={classes.usertext}>
             <img src={img3}/>
              <h4>Waste Collection Status</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/supervisorlandingpage' className={classes.usertext}>
          <img src={img2}/> 
              <h4>Supervisors</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/contractemployeeservices' className={classes.usertext}>
          <img src={img4}/> 
              <h4>Contract Employees</h4>
            </NavLink>
          </li>
         
        </ul>
      </div>

    </div> 
  );
};

const textstyle = {
  color: "black",
  textAlign: "center",
  textdecoration: "none"
};

export default Homeservices;
