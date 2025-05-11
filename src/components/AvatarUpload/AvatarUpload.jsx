import { ErrorMessage, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { selectUserID } from "../../redux/posts/selectors"
import axios from "axios"
import { userUploadAvatar } from "../../redux/auth/operations"

const AvatarUpload = () => {
    const dispatch = useDispatch()
    const userId = useSelector(selectUserID)

    const uploadToCloudinary = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'blogbook')

        const res = await axios.post('https://api.cloudinary.com/v1_1/dus4nwilr/image/upload', formData)
        return res.data.secure_url
    }
    const handleSubmit = async (values, { resetForm }) => {
        try {
            const imageUrl = await uploadToCloudinary(values.imageFile);
            await dispatch(userUploadAvatar({ userId, avatar: imageUrl })).unwrap();
            resetForm();
        } catch (err) {
            console.error('Avatar upload failed:', err);
        }
    }
    const handleValidation = (values) => {
        if (!values.imageFile) {
            return;
        }

        const errors = {};
        const file = values.imageFile;
        console.log(file.size);
        if (!file) {
            errors.imageFile = "File is required";
        } else if (file.size > 3 * 1024 * 1024) {
            errors.imageFile = "File is too large (max 3MB)";
        }
        return errors;
    }

    return (
        <div className="p-4 mx-auto bg-white  shadow-md   border border-gray-200 mt-4">
            <p>Upload your avatar</p>
            <Formik
                initialValues={{ imageFile: null }}
                validate={handleValidation}
                onSubmit={handleSubmit}>
                {({ setFieldValue, isSubmitting, isValid }) => (
                    <Form>
                        <div className="flex justify-between gap-4">
                            <button
                                type="button"
                                className="flex btn"
                                onClick={() => document.getElementById("imageFile").click()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                </svg>
                                Choose a file
                            </button >
                            <input
                                type="file"
                                id="imageFile"
                                name="imageFile"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    setFieldValue('imageFile', e.currentTarget.files[0])
                                }}
                            />
                            <button type="submit" className="flex btn" disabled={isSubmitting || !isValid}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                {isSubmitting ? 'Uploading...' : 'Upload'}


                            </button>
                            <ErrorMessage name="imageFile" component="div" style={{ color: 'red' }} />
                        </div >


                    </Form >
                )}
            </Formik >
        </div >
    )
}

export default AvatarUpload