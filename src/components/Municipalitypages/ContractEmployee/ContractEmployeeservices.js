import classes from '../Municipalityservices.module.css';
import img4 from '../../../Assets/Municipality/img4.png';
import img1 from '../../../Assets/Municipality/img1.png';
import { NavLink } from 'react-router-dom';

const ContractEmployeeservices = (props) => {
  return (
    <div className={classes.home}>
      <div className={classes.writeup}>
       
       
      </div>
     
      <div className={classes.logolinks}>
        <ul>
          <li>
            <NavLink to = "/contractemployee" className={classes.usertext}>
              <img src={img1}/> 
              <h4>Employee Details</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to ='/contractemployeeExcel' className={classes.usertext}>
             <img src={img4}/>
              <h4>Add Employee</h4>
            </NavLink>
          </li>
          </ul>
      </div>

    </div> 
  );
};
export default ContractEmployeeservices;
























// import classes from './Municipalityservices.module.css';
// import img4 from './img4.png'
// import img1 from './img1.png'


// import { NavLink } from 'react-router-dom';

// const ContractEmployeeservices = (props) => {
//   return (
//     <div className={classes.home}>
//       <div className={classes.writeup}>
       
       
//       </div>
     
//       <div className={classes.logolinks}>
//         <ul>
//           <li>
//             <NavLink to = "/contractemployee" className={classes.usertext}>
//               <img src={img1}/> 
//               <h4>Employee Details</h4>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to ='/contractemployeeExcel' className={classes.usertext}>
//              <img src={img4}/>
//               <h4>Add Employee</h4>
//             </NavLink>
//           </li>
//           </ul>
//       </div>

//     </div> 
//   );
// };

// // const textstyle = {
// //   color: "black",
// //   textAlign: "center",
// //   textdecoration: "none"
// // };

// export default ContractEmployeeservices;