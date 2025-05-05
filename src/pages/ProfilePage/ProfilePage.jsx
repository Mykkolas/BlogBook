import { useDispatch, useSelector } from "react-redux"
import { userDelete, userLogout, userUpdateProfile } from "../../redux/auth/operations"
import { selectUserAvatar, selectUserEmail, selectUserName } from "../../redux/auth/selectors"
import AvatarUpload from "../../components/AvatarUpload/AvatarUpload"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup";
import { useState } from "react"
import { selectUserID } from "../../redux/posts/selectors"
import { fetchPosts, userUpdatePostsInfo } from "../../redux/posts/operations"
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal"


const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const userName = useSelector(selectUserName)
    const userEmail = useSelector(selectUserEmail)
    const userId = useSelector(selectUserID)
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
            /* console.log(values);
            console.log(userId); */
            await dispatch(userUpdateProfile({
                id: userId,
                name: values.name,
                email: values.email
            })).unwrap()
            setIsEditing(false)
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleUpdate = async () => {
        await dispatch(userUpdatePostsInfo({ userId, avatar, userName }));
        await dispatch(fetchPosts()); // only this combo  seems to resolve my issue
    }
    const handleDelete = async () => {
        try {
            await dispatch(userDelete(userId)).unwrap()
            setShowConfirm(false)
        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <div>
            <button onClick={() => handleLogout()}>Logout</button>
            <button onClick={() => setShowConfirm(true)}>Delete account</button>
            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete your account? *It will also delete your posts"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
            <h2>{userName}</h2>
            <p>{userEmail}</p>
            <button onClick={() => setIsEditing(true)}>Edit profile</button>
            <button type="button" onClick={() => handleUpdate()}>Update Posts</button>

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