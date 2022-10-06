import { BiSearch } from "react-icons/bi";
import { IoIosArrowDropdownCircle, IoMdNotifications } from 'react-icons/io'
import { useContext, useState } from "react";
import "./navbar.scss";
import {
    Link
} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Logout } from "../../context/AuthContext/apiCalls";


const Navbar = () => {
    const { dispatch } = useContext(AuthContext);
    const out = () => {
        Logout(dispatch);
    }
    //using state for scrolling.
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };
    return (
        //adding scrolled class if the state turns out to be true.
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt=""
                    />
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span>Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span>Movies</span>
                    </Link>
                    <span>New and Popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <BiSearch className="icon" />
                    <span>KID</span>
                    <IoMdNotifications className="icon" />
                    <img
                        src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                    />
                    <div className="profile">
                        <IoIosArrowDropdownCircle className="icon" />
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={out}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;