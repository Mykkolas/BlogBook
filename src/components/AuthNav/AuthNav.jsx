import { NavLink } from "react-router-dom"

const AuthNav = () => {
    return (
        <div className="flex gap-2.5">
            <NavLink className="btn  " to="/login">Login</NavLink>
            <NavLink className="btn " to="/register">Register</NavLink>
        </div>
    )
}

export default AuthNav