import { useDispatch, useSelector } from "react-redux"
import { userLogout } from "../../redux/auth/operations"
import { selectUserAvatar, selectUserEmail, selectUserName } from "../../redux/auth/selectors"
import AvatarUpload from "../../components/AvatarUpload/AvatarUpload"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup";
import { useState } from "react"


const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const userName = useSelector(selectUserName)
    const userEmail = useSelector(selectUserEmail)
    const avatar = useSelector(selectUserAvatar)
    const dispatch = useDispatch()
    const handleLogout = async () => {
        try {
            await dispatch(userLogout()).unwrap()
        }
        catch (err) {
            console.log(err);
        }
    }
    const initialValues = {
        name: userName,
        email: userEmail
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(20, "Too Long!").required("Required"),
        email: Yup.string().email("Invalid email").min(3, "Too short").max(40, "Too long").required("Required"),
    })

    const handleSubmit = async (values) => {
        try {
            console.log(values);
            setIsEditing(false)
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <button onClick={() => handleLogout()}>Logout</button>
            <h2>{userName}</h2>
            <p>{userEmail}</p>
            <button onClick={() => setIsEditing(true)}>Edit profile</button>
            {isEditing && (
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ isValid, dirty }) => (
                        <Form>
                            <Field name="name" type="text" id="name-profile" />
                            <Field name="email" type="email" id="email-profile" />
                            <button type="submit" disabled={!isValid || !dirty}>Save</button> {/* dirty is perfect for not allowing, sending untouched edit! */}
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </Form>
                    )}
                </Formik>
            )}





            {avatar.startsWith("https") ? (
                <img
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                    src={avatar}
                    alt={`${userName}'s avatar`}
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
                    {userName?.charAt(0).toUpperCase() || "?"}
                </div>
            )}
            <AvatarUpload />
        </div>
    )
}

export default ProfilePage