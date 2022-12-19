import { NavLink } from "react-router-dom";
import Houseownerservices from "../components/Houseownerservices";

 const MainPage = () => {

    return(

        <NavLink to = "/mainpage">
               <Houseownerservices/>
        </NavLink>
        
    )
 }

 export default MainPage;