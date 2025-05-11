import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { selectUser } from "../../redux/auth/selectors"

const UserMenu = () => {



    const user = useSelector(selectUser)
    return (
        <div>
            <NavLink to="/profile">
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
                                backgroundColor: "grey",
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