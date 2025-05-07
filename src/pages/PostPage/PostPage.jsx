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
        taggedUsers: Yup.array().of(Yup.string())
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
        imageFile: ""
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
            const imageUrl = await uploadToCloudinary(values.imageFile);
            await dispatch(addPost({
                title: values.title.trim(),
                body: values.body.trim(),
                theme: values.theme,
                taggedUsers: values.taggedUsers,
                imageFile: imageUrl
            })).unwrap()
            resetForm()
            navigate("/")
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ errors, touched, isValid, isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <Field name="title" type="text" id="title" />
                        {errors.title && touched.title && <div>{errors.title}</div>}
                        <Field name="body" type="text" as="textarea" rows="10" cols="50" style={{ resize: 'none' }} id="body" />
                        {errors.body && touched.body && <div>{errors.body}</div>}
                        <Field name="taggedUsers">
                            {({ field, form }) => (
                                <Select
                                    isMulti
                                    name="taggedUsers"
                                    options={userOptions}
                                    placeholder="Tag users..."
                                    value={userOptions.filter(option => field.value.includes(option.value))}
                                    onChange={selectedOptions => {
                                        const values = selectedOptions.map(option => option.value);
                                        form.setFieldValue("taggedUsers", values);
                                    }}
                                />
                            )}
                        </Field>

                        <div>
                            <label htmlFor="imageFile">Image</label>
                            <input
                                type="file"
                                name="imageFile"
                                accept="image/*"
                                onChange={(e) => setFieldValue("imageFile", e.currentTarget.files[0])}
                            />
                            <ErrorMessage name="imageFile" component="div" style={{ color: 'red' }} />
                            {values.imageFile && (
                                <div style={{ marginTop: "10px" }}>
                                    <img
                                        src={URL.createObjectURL(values.imageFile)}
                                        alt="preview"
                                        width={150}
                                        style={{ borderRadius: "8px" }}
                                    />
                                </div>
                            )}
                        </div>


                        <button type="submit" disabled={!isValid || isSubmitting} > {isSubmitting ? 'Posting...' : 'Post'}</button>
                        <Field as="select" name="theme">
                            <option value="">Select theme</option>
                            <option value="Travel">Travel</option>
                            <option value="Technology">Technology</option>
                            <option value="Crypto">Crypto</option>
                            <option value="Politics">Politics</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Other">Other</option>
                        </Field>
                        {errors.theme && touched.theme && <div>{errors.theme}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default PostPage