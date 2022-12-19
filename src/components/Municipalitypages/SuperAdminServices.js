import classes from './Municipalityservices.module.css';
import img from '../../Assets/Municipality/logo1.0.jpg'
import img1 from '../../Assets/Municipality/img1.png'
import img3 from '../../Assets/Municipality/logo1.2.jpg'
import img4 from '../../Assets/Municipality/icon4.png'



import { NavLink } from 'react-router-dom';

const SuperAdminservices = (props) => {
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
            <NavLink to ='/contractemployee' className={classes.usertext}>
             <img src={img4}/>
              <h4>Contract Employees</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/updatewastedetails' className={classes.usertext}>
           <img src={img1}/>   
              <h4>Update Waste details</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/wastecollectionstatus' className={classes.usertext}>
          <img src={img3}/> 
              <h4>Waste Collection Status</h4>
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

export default SuperAdminservices;