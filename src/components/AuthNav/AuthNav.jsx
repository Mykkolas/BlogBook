import { NavLink } from "react-router-dom"

const AuthNav = () => {
    return (
        <div className="flex gap-3.5">
            <NavLink className="btn font-bold border-0  lg:p-8 " to="/login">Login</NavLink>
            <NavLink className="btn lg:p-8 font-bold bg-emerald-200 border-0 " to="/register">Register</NavLink>
        </div>
    )
}

export default AuthNav