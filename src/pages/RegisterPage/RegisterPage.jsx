import { Field, Form, Formik, ErrorMessage } from "formik"
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { userRegister } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
const RegisterPage = () => {
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Too Short!").max(20, "Too Long!").required("Required"),
        email: Yup.string().email("Invalid email").min(3, "Too short").max(40, "Too long").required("Required"),
        password: Yup.string().min(8, "Too short").max(20, "Too long").required("Required"),
    })

    const initialValues = {
        email: "",
        name: "",
        password: ""
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            await dispatch(userRegister(values)).unwrap() // need to check if the name has been alredy taken (very important!!!)
            resetForm()
            toast.success("Successfully registered!")
        }
        catch (err) {
            toast.error(`${err}`)
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen flex  p-5 md:p-0 items-center justify-center ">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                {/* Logo / Return */}
                <div className="mb-6 text-center">
                    <NavLink to="/">
                        BLOGBOOK
                    </NavLink>
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="space-y-3">
                        {/* Name Field */}
                        <div className="relative pb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="absolute -bottom-1 left-0 text-xs text-red-500"
                            />
                            <Field
                                name="name"
                                type="text"
                                id="name"
                                className="w-full pl-4 pr-4 py-2 bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                            />
                        </div>

                        {/* Email Field */}
                        <div className="relative pb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="absolute -bottom-1 left-0 text-xs text-red-500"
                            />
                            <Field
                                name="email"
                                type="email"
                                id="email"
                                className="w-full pl-4 pr-4 py-2 bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative pb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="absolute -bottom-1 left-0 text-xs text-red-500"
                            />
                            <Field
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                className="w-full pl-4 pr-4 py-2 bg-white shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 mt-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
                        >
                            Register
                        </button>
                        <NavLink to="/login">Already registered?</NavLink>
                    </Form>
                </Formik>

            </div>
        </div >
    )
}

export default RegisterPage