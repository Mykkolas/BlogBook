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
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

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
        <div className="min-h-screen md:px-20 lg:px-40 md:pt-10 ">
            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete your account? *It will also delete your posts"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
            <div>
                {isEditing ? (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ isValid, dirty }) => (
                            <Form className="rounded-xl mx-auto mt-4 p-4 bg-white border border-gray-200  shadow ">
                                <div >
                                    <label htmlFor="name-profile" className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        id="name-profile"
                                        autoComplete="off"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 text-gray-800"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email-profile" className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        id="email-profile"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-600 text-gray-800"
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button className="btn" type="submit" disabled={!isValid || !dirty}>
                                        Save
                                    </button>
                                    <button className="btn" type="button" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                ) :
                    <div className="p-4 rounded-xl mx-auto bg-white  shadow-md   border border-gray-200 mt-4">
                        <div className="flex items-center justify-between pb-4">
                            <div className="flex items-center space-x-3">
                                <UserIcon className="h-6 w-6 text-black" />
                                <h2 className="text-lg text-gray-800">
                                    <span className="font-normal text-gray-600">{userName}</span>
                                </h2>
                            </div>
                            <button
                                className="btn"
                                onClick={() => setIsEditing(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                Edit
                            </button>
                        </div>


                        <div className="flex items-center  justify-between">
                            <div className="flex items-center space-x-3">
                                <EnvelopeIcon className="h-6 w-6 text-black" />
                                <p className="text-lg text-gray-800">
                                    <span className="text-gray-600">{userEmail}</span>
                                </p>
                            </div>
                        </div>

                    </div>
                }
            </div>

            <AvatarUpload />
            <div className="flex justify-between mt-4 p-4 rounded-xl  bg-white shadow-md   border border-gray-200">
                <button className="btn " onClick={() => handleLogout()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>Logout</button>
                <button className="btn " onClick={() => setShowConfirm(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    Delete account</button>
            </div>
            <div className="flex flex-col rounded-xl mt-4 p-4  bg-white shadow-md   border border-gray-200">
                <button
                    className="btn w-50"
                    type="button"
                    onClick={handleUpdate}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>

                    Update Your Posts
                </button>
                <p className="text-sm text-gray-500 pt-2">
                    Updates your previous posts with your new avatar and username
                </p>

            </div>
        </div>
    )
}

export default ProfilePage