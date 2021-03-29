import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import settingsIcon from '../images/settingsicon.png';
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../features/users/usersSlice'
import { pageUser } from '../features/users/usersSlice'

export const Navbar = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const logout = () => {
        window.localStorage.removeItem('token')
        dispatch(userLogout())
        console.log("hiiii")
        history.push('/')
    }

    const currentUser = useSelector(state => state.users.currentUser)

    if (currentUser) {
        return (
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/account" onClick={() => dispatch(pageUser())}>Account</Link>
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
                    {/* <Link to="/account/settings">Settings</Link>
                    <Link to="/account/my-favorites">My Favorites</Link> */}
                    <Link to="/account">My Account</Link>
                    <a href="/" onClick={() => logout()}>Logout</a>
                    {/* Make this a working logout link */}
                    </div>
                </div> 
            </div>
        )
    } else {
        return(
        <div className="navbar">
                <Link to="/">Home</Link>
                <div className="dropdown left">
                    <button className="dropbtn gen">Books</button>
                    <div className="dropdown-content">
                    <Link to="/books/sort/author">By Author</Link>
                    <Link to="/books/sort/title">By Title</Link>
                    <Link to="/books">Browse</Link>
                    </div>
                </div>
                <div className="right">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
        </div>
        )
    }
}