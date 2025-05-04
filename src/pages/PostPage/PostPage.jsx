import { useDispatch } from "react-redux"
import * as Yup from "yup";
import { Field, Form, Formik } from "formik"
import { addPost } from "../../redux/posts/operations";
import { useNavigate } from "react-router-dom";
const PostPage = () => {
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3, "Too Short!").max(50, "Too Long!").required("Required"),
        body: Yup.string().min(3, "Too short").max(500, "Too long").required("Required"),
        theme: Yup.string().required("Theme is required"),
    })
    const navigate = useNavigate()

    const initialValues = {
        title: "",
        body: "",
        theme: ""
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(addPost({
                title: values.title.trim(),
                body: values.body.trim(),
                theme: values.theme
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
                {({ errors, touched, isValid }) => (
                    <Form>
                        <Field name="title" type="text" id="title" />
                        {errors.title && touched.title && <div>{errors.title}</div>}
                        <Field name="body" type="text" as="textarea" rows="10" cols="50" style={{ resize: 'none' }} id="body" />
                        {errors.body && touched.body && <div>{errors.body}</div>}
                        <button type="submit" disabled={!isValid} >Post</button>
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