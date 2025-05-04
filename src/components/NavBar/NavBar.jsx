import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import UserMenu from "../UserMenu/UserMenu"
import AuthNav from "../AuthNav/AuthNav"
import Navigation from "../Navigation/Navigation"

const NavBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    return (
        <nav>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </nav>
    )
}

export default NavBar