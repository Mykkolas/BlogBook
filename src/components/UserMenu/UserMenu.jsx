import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectUser } from "../../redux/auth/selectors"

const UserMenu = () => {
    const user = useSelector(selectUser)
    return (
        <div>
            <h2>Welcome, {user.name}</h2>

            <NavLink to="/posts">New Post</NavLink>
            <NavLink to="/profile">Profile</NavLink>
        </div>
    )
}

export default UserMenu