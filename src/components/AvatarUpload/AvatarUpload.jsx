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
            /*  await dispatch(userUpdatePostAvatar({ id: userId, avatar: imageUrl })).unwrap() */
            resetForm();
        } catch (err) {
            console.error('Avatar upload failed:', err);
        }
    }
    const handleValidation = (values) => {
        const errors = {};
        const file = values.imageFile;
        if (!file) {
            errors.imageFile = "File is required";
        } else if (file.size > 2 * 1024 * 1024) {
            errors.imageFile = "File is too large (max 2MB)";
        }
        return errors;
    }

    return (
        <div>
            <p>Upload your avatar</p>
            <Formik
                initialValues={{ imageFile: null }}
                validate={handleValidation}
                onSubmit={handleSubmit}>
                {({ setFieldValue, isSubmitting }) => (
                    <Form>
                        <div>
                            <input
                                type="file"
                                name="imageFile"
                                accept="image/*"
                                onChange={(e) => setFieldValue('imageFile', e.currentTarget.files[0])}
                            />
                            <ErrorMessage name="imageFile" component="div" style={{ color: 'red' }} />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Uploading...' : 'Upload'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AvatarUpload