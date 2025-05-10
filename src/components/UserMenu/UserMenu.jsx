import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectUser } from "../../redux/auth/selectors"

const UserMenu = () => {

    function getRandomColor() {
        const colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#607d8b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }


    const user = useSelector(selectUser)
    return (
        <div>
            <NavLink to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div>
                    {user.avatar.startsWith("https") ? (
                        <img
                            style={{ width: 50, height: 50, borderRadius: "50%" }}
                            src={user.avatar}
                            alt={`${user.name}'s avatar`}
                        />
                    ) : (
                        <div
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: "50%",
                                backgroundColor: getRandomColor(), // see note below
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                                color: "#fff"
                            }}
                        >
                            {user.name?.charAt(0).toUpperCase() || "?"}
                        </div>
                    )}
                </div>
            </NavLink>
            <div className="hidden md:flex">
                <NavLink to="/posts">New Post</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </div>
        </div>
    )
}

export default UserMenu