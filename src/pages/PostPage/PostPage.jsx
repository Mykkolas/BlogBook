import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { addPost } from "../../redux/posts/operations";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../redux/users/selectors";
import { selectUserName } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchAllUsers } from "../../redux/users/operations";
import Select from "react-select";
import axios from "axios";
const PostPage = () => {
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        body: Yup.string().min(3, "Too short").max(500, "Too long").required("Required"),
        theme: Yup.string().required("Theme is required"),
        taggedUsers: Yup.array().of(Yup.string()),
        images: Yup.mixed()
            .test("fileCount", "You can upload up to 2 images", value => value && value.length <= 2)
            .test("fileSize", "Each image must be under 3MB", value =>
                value ? value.every(file => file.size <= 3 * 1024 * 1024) : true
            )
    })
    const navigate = useNavigate()
    const currentUsername = useSelector(selectUserName);
    const allUsers = useSelector(selectAllUsers);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);


    const taggableUsers = allUsers.filter(user => user.name !== currentUsername);
    const userOptions = taggableUsers.map(user => ({
        value: user.name,
        label: user.name,
    }));

    const initialValues = {
        title: "",
        body: "",
        theme: "",
        taggedUsers: [],
        images: []
    }

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blogbook");

        const res = await axios.post("https://api.cloudinary.com/v1_1/dus4nwilr/image/upload", formData);

        return res.data.secure_url;
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const uploadedUrls = await Promise.all(
                values.images.map(file => uploadToCloudinary(file))
            );

            await dispatch(addPost({
                title: values.title.trim(),
                body: values.body.trim(),
                theme: values.theme,
                taggedUsers: values.taggedUsers,
                images: uploadedUrls
            })).unwrap();
            resetForm()
            navigate("/")
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="mt-10  bg-white p-4 mb-5  shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create a Post</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, isSubmitting, values, setFieldValue }) => (
                    <Form >
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                                Title
                            </label>
                            <Field
                                name="title"
                                type="text"
                                id="title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        {/* Body */}
                        <div>
                            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                                Body
                            </label>
                            <Field
                                name="body"
                                as="textarea"
                                id="body"
                                rows="10"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                            />
                            <ErrorMessage name="body" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        {/* Tagged Users */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tag Users
                            </label>
                            <Field name="taggedUsers">
                                {({ field, form }) => (
                                    <Select
                                        isMulti
                                        name="taggedUsers"
                                        options={userOptions}
                                        placeholder="Tag users..."
                                        value={userOptions.filter(option => field.value.includes(option.value))}
                                        onChange={(selectedOptions) => {
                                            const values = selectedOptions.map(option => option.value);
                                            form.setFieldValue("taggedUsers", values);
                                        }}
                                    />
                                )}
                            </Field>
                        </div>

                        {/* File Upload */}
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                                Upload photos (max. 2)
                            </label>
                            <button
                                type="button"
                                onClick={() => document.getElementById("images").click()}
                                className="px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 transition"
                            >
                                Choose files
                            </button>
                            <input
                                id="images"
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={(e) => {
                                    let files = Array.from(e.currentTarget.files);
                                    if (files.length > 2) {
                                        alert("You can upload only two photos. Extra files are ignored!");
                                        files = files.slice(0, 2);
                                    }
                                    setFieldValue("images", files);
                                }}
                            />
                            <ErrorMessage name="images" component="div" className="text-red-600 text-sm mt-1" />

                            {values.images && values.images.length > 0 && (
                                <div className="flex gap-4 mt-4">
                                    {values.images.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt={`preview-${index}`}
                                            className="w-36 h-36 object-cover rounded-md shadow"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Theme */}
                        <div>
                            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Theme
                            </label>
                            <Field
                                as="select"
                                name="theme"
                                id="theme"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            >
                                <option value="">Select theme</option>
                                <option value="Travel">Travel</option>
                                <option value="Technology">Technology</option>
                                <option value="Crypto">Crypto</option>
                                <option value="Politics">Politics</option>
                                <option value="Cooking">Cooking</option>
                                <option value="Health">Health</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Other">Other</option>
                            </Field>
                            <ErrorMessage name="theme" component="div" className="text-red-600 text-sm mt-1" />
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
                            >
                                {isSubmitting ? 'Posting...' : 'Post'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default PostPage