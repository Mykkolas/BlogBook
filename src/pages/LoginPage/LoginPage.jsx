import { Field, Form, Formik } from "formik"
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userLogin } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";
const LoginPage = () => {
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").min(3, "Too short").max(40, "Too long").required("Required"),
        password: Yup.string().min(8, "Too short").max(20, "Too long").required("Required"),
    })

    const initialValues = {
        email: "",
        password: ""
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(userLogin(values)).unwrap()
            resetForm()
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                {/* Logo / Return */}
                <div className="mb-6 text-center">
                    <NavLink to="/" className="text-indigo-600 hover:underline font-medium">
                        Here will be logo to come back
                    </NavLink>
                </div>

                {/* Formik Form */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid, isSubmitting }) => (
                        <Form className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    id="email"
                                    className="w-full pl-4 pr-4 py-2 bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"

                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="off"
                                    className="w-full pl-4 pr-4 py-2 bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"


                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition"
                                disabled={!isValid || isSubmitting}
                            >
                                Login
                            </button>
                            <NavLink to="/register">Not registered?</NavLink>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginPage