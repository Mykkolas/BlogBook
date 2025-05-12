import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { addPost } from "../../redux/posts/operations";
import { useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../redux/users/selectors";
import { selectUserName } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchAllUsers } from "../../redux/users/operations";
import { components } from 'react-select';
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

    const DropdownIndicator = (props) => {
        const { menuIsOpen } = props.selectProps;

        return (
            <components.DropdownIndicator {...props}>
                <svg
                    className={`w-4 h-4 text-green-600 transition-transform duration-200 ${menuIsOpen ? 'rotate-180' : ''
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </components.DropdownIndicator>
        );
    };


    const initialValues = {
        title: "",
        body: "",
        theme: "",
        taggedUsers: [],
        images: []
    }

    const themeOptions = [
        { value: '', label: 'Select theme' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Crypto', label: 'Crypto' },
        { value: 'Politics', label: 'Politics' },
        { value: 'Health', label: 'Health' },
        { value: 'Lifestyle', label: 'Lifestyle' },
        { value: 'Music', label: 'Music' },
        { value: 'Sport', label: 'Sport' },
        { value: 'Other', label: 'Other' },
    ];

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
        <div className="mt-10  bg-white p-4 mb-5 rounded-md shadow-md border border-gray-200">
            {/* <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create a Post</h2> */}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, isSubmitting, values, setFieldValue }) => (
                    <Form >
                        {/* Title */}
                        <div className="relative mb-6">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                                Title
                            </label>
                            <Field
                                name="title"
                                type="text"
                                id="title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-600 text-sm absolute" />
                        </div>

                        {/* Body */}
                        <div className="relative mb-6">
                            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                                Body
                            </label>
                            <Field
                                name="body"
                                as="textarea"
                                id="body"
                                rows="8"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                            />
                            <ErrorMessage name="body" component="div" className="text-red-600 text-sm  absolute" />
                        </div>

                        {/* Tagged Users */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700  mb-1">
                                Tag Users
                            </label>
                            <Field name="taggedUsers">
                                {({ field, form }) => (
                                    <Select
                                        menuPlacement="top"
                                        isMulti
                                        components={{ DropdownIndicator }}
                                        name="taggedUsers"
                                        options={userOptions}
                                        placeholder="Tag users..."
                                        value={userOptions.filter(option => field.value.includes(option.value))}
                                        onChange={(selectedOptions) => {
                                            const values = selectedOptions.map(option => option.value);
                                            form.setFieldValue("taggedUsers", values);
                                        }}
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                backgroundColor: 'white',
                                                borderColor: state.isFocused ? '#10b981' : '#d1d5db',
                                                boxShadow: state.isFocused ? '0 0 0 2px rgba(16, 185, 129, 0.4)' : 'none',
                                                '&:hover': {
                                                    borderColor: '#10b981',
                                                },
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isFocused
                                                    ? '#d1fae5'
                                                    : 'white',
                                                color: state.isFocused ? '#065f46' : '#374151', // green-800 text
                                                cursor: 'pointer',
                                            }),
                                            multiValue: (base) => ({
                                                ...base,
                                                backgroundColor: '#d1fae5',
                                            }),
                                            multiValueLabel: (base) => ({
                                                ...base,
                                                color: '#065f46',
                                            }),
                                            multiValueRemove: (base) => ({
                                                ...base,
                                                color: '#065f46',
                                                ':hover': {
                                                    backgroundColor: '#10b981',
                                                    color: 'white',
                                                },
                                            }),
                                        }}
                                    />
                                )}
                            </Field>

                        </div>

                        {/* File Upload */}
                        <div>
                            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                                Upload photos (max. 2)
                            </label>
                            <button
                                type="button"
                                onClick={() => document.getElementById("images").click()}
                                className="btn px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                </svg>
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
                            <ErrorMessage name="images" component="div" className="text-red-600 text-sm  absolute" />

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
                        <div className="relative mb-3">
                            <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1 mt-2">
                                Select Theme
                            </label>
                            <Field name="theme">
                                {({ field, form }) => (
                                    <Select
                                        name="theme"
                                        menuPlacement="top"
                                        components={{ DropdownIndicator }}
                                        options={themeOptions}
                                        value={themeOptions.find(option => option.value === field.value)}
                                        onChange={option => form.setFieldValue('theme', option.value)}
                                        placeholder="Select theme"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                backgroundColor: 'white',
                                                borderColor: state.isFocused ? '#10b981' : '#d1d5db', // green-500 or gray-300
                                                boxShadow: state.isFocused ? '0 0 0 2px rgba(16, 185, 129, 0.4)' : 'none',
                                                '&:hover': {
                                                    borderColor: '#10b981',
                                                },
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isFocused ? '#d1fae5' : 'white', // green-100 on hover
                                                color: state.isFocused ? '#065f46' : '#374151', // green-800 vs gray-700
                                                cursor: 'pointer',
                                            }),
                                            singleValue: (base) => ({
                                                ...base,
                                                color: 'gray',
                                            }),
                                        }}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="theme" component="div" className="text-red-600 text-sm  absolute" />
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className="w-full btn py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
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