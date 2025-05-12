import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import UserMenu from "../UserMenu/UserMenu"
import AuthNav from "../AuthNav/AuthNav"
import { NavLink } from "react-router-dom"
const NavBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    return (
        <div className="navbar  bg-green-700 shadow-sm rounded-md">
            <div className="navbar-start">
                <NavLink className="btn text-xl bg-green-800 border-0 shadow-none text-white " to="/">Blogbook</NavLink>
            </div>
            <div className="navbar-center hidden md:flex">
            </div>
            <div className="navbar-end">
                {isLoggedIn ? <UserMenu /> : <AuthNav />}
            </div>
        </div>

    )
}

export default NavBar