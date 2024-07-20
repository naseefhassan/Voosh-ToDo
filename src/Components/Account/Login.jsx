import { ErrorMessage, Field, Formik } from "formik";
import Header from "../Header/Header";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../Api/axios'


function Login() {

  const navigate = useNavigate()

  const initialValue = {
    email: "",
    password: "",
  };
  
  const ValidationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <>
      <Header />
      <Formik
        initialValues={initialValue}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await axiosInstance.post('/login',values)
            const token = response.data.token
            localStorage.setItem('Jwt',token)
            navigate('/')
            resetForm()
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="flex flex-col   justify-center items-center h-screen">
            <div className="sm:w-[300px]">
              <h1 className="font-bold text-left text-blue-600 text-xl py-2">
                Login
              </h1>
              <form
                className="border-2 border-blue-600 p-4 rounded-md"
                onSubmit={handleSubmit}
              >
                <div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className=" text-red-500 text-[12px] p-1 "
                  />
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    values={values.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="p-1 text-sm border-2 w-full my-2"
                  />
                </div>
                <div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className=" text-red-500 text-[12px] p-1 "
                  />
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    values={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="p-1 border-2 w-full my-2 text-sm "
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-1 text-sm "
                >
                  Login
                </button>
                <h1 className="text-[10px] text-center py-2">Don't have an account? <Link to={'/auth/signup'}><span className="text-blue-600 cursor-pointer">Signup</span></Link></h1>
                <div className="flex justify-center py-2">
                <button className="bg-blue-600 rounded-md p-2 text-white text-[10px] ">Login with <span className="font-bold">google</span></button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
