import { NavLink } from "react-router-dom";



import classes from './MainHeader.module.css';

const MainHeader = () => {
    return(
        <header className={classes.header}>
            <nav>
                <ul>
                    <div className="button1">
                    <li>
                       
                            <div>House Owner Portal</div>
                    </li>
                    </div>
                    <div className="button2">
                    <li>
                    <NavLink activeClassName={classes.active} to  = '/products'>
                            Logout
                            </NavLink>
                    </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;