
import classes from './Municipalityservices.module.css';
import img from '../../Assets/Municipality/imgg1.png'
import img1 from '../../Assets/Municipality/img1.png'
import img2 from '../../Assets/Municipality/img2.png'
import img3 from '../../Assets/Municipality/img3.png'


import { NavLink } from 'react-router-dom';

const Superviserservices = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.writeup}>
       
        
      </div>
      
      <div className={classes.logolinks}>
        <ul>
          <li>
            <NavLink to = "/wastecollectionupdate" className={classes.usertext}>
               <img src={img}/> 
              <h4>Waste Collection Update</h4>
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

export default Superviserservices;