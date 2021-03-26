import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import settingsIcon from '../images/settingsicon.png';
import { useDispatch } from 'react-redux'
import { userLogout } from '../features/users/usersSlice'

export const Navbar = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        window.localStorage.removeItem('token')
        dispatch(userLogout())
        console.log("hiiii")
        history.push('/')
    }

        return (
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/account">Account</Link>
                <div className="dropdown left">
                    <button className="dropbtn gen">Books</button>
                    <div className="dropdown-content">
                    <Link to="/books/sort/author">By Author</Link>
                    <Link to="/books/sort/title">By Title</Link>
                    <Link to="/books">Browse</Link>
                    </div>
                </div>
                <div className="dropdown right">
                    <button className="dropbtn settings"><img src={settingsIcon} alt="settings-icon" height="35px"/></button>
                    <div className="dropdown-content-right">
                    <Link to="/account/settings">Settings</Link>
                    <Link to="/account/my-favorites">My Favorites</Link>
                    <Link to="/account/my-reviews">My Reviews</Link>
                    <a onClick={() => logout()}>Logout</a>
                    {/* Make this a working logout link */}
                    </div>
                </div> 
            </div>
        )
}