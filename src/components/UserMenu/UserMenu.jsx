import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectUser } from "../../redux/auth/selectors"

const UserMenu = () => {



    const user = useSelector(selectUser)
    return (
        <div>
            <NavLink to="/profile">
                <div className="active:scale-85 transition">
                    {user.avatar.startsWith("https") ? (
                        <img
                            style={{ width: 60, height: 60, borderRadius: "50%", border: "2px solid green" }}
                            src={user.avatar}
                            alt={`${user.name}'s avatar`}
                        />
                    ) : (
                        <div
                            style={{
                                width: 70,
                                height: 70,
                                borderRadius: "50%",
                                backgroundColor: "gray",
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

        </div>
    )
}

export default UserMenu