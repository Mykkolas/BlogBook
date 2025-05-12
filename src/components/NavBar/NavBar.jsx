import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import UserMenu from "../UserMenu/UserMenu"
import AuthNav from "../AuthNav/AuthNav"
import { NavLink } from "react-router-dom"
const NavBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    return (
        /*  <nav>
             
             {isLoggedIn ? <UserMenu /> : <AuthNav />}
         </nav> */
        <div className="navbar  bg-green-700 shadow-sm rounded-md">
            <div className="navbar-start">
                {/* <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            {isLoggedIn ? <NavLink to="/profile">Profile</NavLink>
                                : <NavLink to="/login">Profile</NavLink>}
                        </li>
                        <li>
                            {isLoggedIn ? <NavLink to="/posts">New Post</NavLink>
                                : <NavLink to="/login">New Post</NavLink>}
                        </li>
                    </ul>
                </div> */}
                <NavLink className="btn text-xl bg-green-800 border-0 shadow-none text-white " to="/">Blogbook</NavLink>
            </div>
            <div className="navbar-center hidden md:flex">
                {/* <ul className="menu menu-horizontal px-1">
                    <li><a>Item 1</a></li>
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Item 3</a></li>
                </ul> */}
            </div>
            <div className="navbar-end">
                {isLoggedIn ? <UserMenu /> : <AuthNav />}
            </div>
        </div>

    )
}

export default NavBar