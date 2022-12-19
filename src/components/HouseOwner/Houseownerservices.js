
import classes from './Houseownerservices.module.css';
import img from '../../Assets/HouseOwner/imgg1.png'
import img1 from '../../Assets/HouseOwner/img1.png'
import img2 from '../../Assets/HouseOwner/img2.png'
import img3 from '../../Assets/HouseOwner/img3.png'
import img4 from '../../Assets/HouseOwner/img1.0.png'


import { NavLink } from 'react-router-dom';

const Homeservices = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.writeup}>
       
        
      </div>
      
      <div className={classes.logolinks}>
        <ul>
          <li>
            <NavLink to = "/slotbook" className={classes.usertext}>
               <img src={img}/> 
              <h4>Slot Booking</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/invoice' className={classes.usertext}>
             <img src={img3}/>
              <h4>Bill Payment</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/paymenthistory' className={classes.usertext}>
             <img src={img4}/>
              <h4>Payment History</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/BookingHistory' className={classes.usertext}>
           <img src={img1}/>   
              <h4>Booking History</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/bookingstatus' className={classes.usertext}>
          <img src={img2}/> 
              <h4>Booking Status</h4>
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
