import { ErrorMessage, Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { selectUserID } from "../../redux/posts/selectors"
import axios from "axios"
import { userUploadAvatar } from "../../redux/auth/operations"
import toast from "react-hot-toast"
import { useState } from "react"

const AvatarUpload = () => {
    const [selectedFileName, setSelectedFileName] = useState("");
    const dispatch = useDispatch()
    const userId = useSelector(selectUserID)
    const uploadToCloudinary = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'blogbook')
        const res = await axios.post('https://api.cloudinary.com/v1_1/dus4nwilr/image/upload', formData)
        return res.data.secure_url
    }

    function truncateFileName(name, maxLength = 20) {
        if (name.length <= maxLength) return name;
        const extIndex = name.lastIndexOf('.');
        const extension = extIndex !== -1 ? name.slice(extIndex) : '';
        const baseName = extIndex !== -1 ? name.slice(0, extIndex) : name;
        const partLength = Math.floor((maxLength - 3 - extension.length) / 2);
        return `${baseName.slice(0, partLength)}...${baseName.slice(-partLength)}${extension}`;
    }


    const handleSubmit = async (values, { resetForm }) => {
        if (!values.imageFile) {
            toast.error("Please select a file before uploading.");
            return;
        }
        try {
            const imageUrl = await uploadToCloudinary(values.imageFile);
            await dispatch(userUploadAvatar({ userId, avatar: imageUrl })).unwrap();
            setSelectedFileName("");
            toast.success("Uploaded avatar!");
            resetForm();
        } catch (err) {
            console.log(err);
            toast.error('Avatar upload failed!');
        }
    }
    const handleValidation = (values) => {
        const errors = {};
        const file = values.imageFile;
        if (file.size > 4 * 1024 * 1024) {
            console.log("error!");
            errors.imageFile = "File is too large (max 4MB)";
        }

        return errors;
    };

    return (
        <div className="p-4 pb-7 mx-auto rounded-xl bg-white  relative  shadow-md   border border-gray-200 mt-4">
            <p className="text-black text-sm pb-2">Upload your avatar</p>
            <Formik
                initialValues={{ imageFile: null }}
                validate={handleValidation}
                validateOnChange={true}
                onSubmit={handleSubmit}>
                {({ setFieldValue, isSubmitting, isValid, setTouched }) => (
                    <Form>
                        <div className="flex  justify-between relative gap-4">
                            <div className="flex">
                                <button
                                    type="button"
                                    className="btn mb-3"
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
                                        const file = e.currentTarget.files[0];
                                        if (file) {
                                            setFieldValue("imageFile", file);
                                            setTouched({ imageFile: true });
                                            setSelectedFileName(file.name);
                                            setTimeout(() => {
                                                document.activeElement.blur(); // trigger validation visually too
                                            }, 0);
                                        }
                                    }}
                                />
                            </div>
                            <button type="submit" className="flex btn" disabled={isSubmitting || !isValid || !selectedFileName}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                {isSubmitting ? 'Uploading...' : 'Upload'}
                            </button>
                            <ErrorMessage name="imageFile">
                                {(msg) => <div className="absolute top-8 text-red-500 text-sm mt-2">{msg}</div>}
                            </ErrorMessage>
                        </div >
                    </Form >
                )}
            </Formik >
            {selectedFileName && (
                <p className="mt-2 text-xs absolute bottom-1 text-gray-700">
                    Selected file: <strong>{truncateFileName(selectedFileName)}</strong>
                </p>
            )}

        </div >
    )
}

export default AvatarUpload