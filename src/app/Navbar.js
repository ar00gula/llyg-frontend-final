import React from 'react'
import { Link } from 'react-router-dom'
import settingsIcon from '../images/settingsicon.png';

export const Navbar = () => {

        return (
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/account">Account</Link>
                <div className="dropdown left">
                    <button className="dropbtn gen">Books</button>
                    <div className="dropdown-content">
                    <Link to="/books">All Books</Link>
                    <Link to="/books/by-author">By Author</Link>
                    <Link to="/books/by-title">By Title</Link>
                    <Link to="/books/by-genre">By Genre</Link>
                    </div>
                </div>
                <div className="dropdown right">
                    <button className="dropbtn settings"><img src={settingsIcon} alt="settings-icon" height="35px"/></button>
                    <div className="dropdown-content-right">
                    <Link to="/account/settings">Settings</Link>
                    <Link to="/account/my-favorites">My Favorites</Link>
                    <Link to="/account/my-reviews">My Reviews</Link>
                    <Link to="/">Logout</Link>
                    {/* Make this a working logout link */}
                    </div>
                </div> 
            </div>
        )
    
}