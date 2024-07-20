import Header from "../Header/Header";
import { ErrorMessage, Field, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from '../../Api/axios'
import { useState } from "react";

function Signup() {

  const [serverError, setServerError] = useState('');
  const navigate = useNavigate()


  const initialValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const ValidationSchema = Yup.object({
    firstName: Yup.string().required("FirstName is required"),
    lastName: Yup.string().required("LastName is required"),
    email: Yup.string()
      .email("Invaild email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "password must contain 8 character")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "password must contain multiple character"
      )
      .required("password is required"),
    confirmPassword:Yup.string().oneOf([Yup.ref('password'),null],'password Not matching').required('confrim password required')
  });
  return (
    <>
      <Header />
      <Formik
        initialValues={initialValue}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await axiosInstance.post("/signup", values);
            const token = response.data.token;
            localStorage.setItem("Jwt", token);
            navigate("/");
            resetForm();
          } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
              setServerError(error.response.data.message);
            } else {
              setServerError("An unexpected error occurred");
            }
          }
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="flex flex-col   justify-center items-center h-screen">
            <div className="sm:w-[300px]">
              <h1 className="font-bold text-left text-blue-600 text-xl">
                Signup
              </h1>
              <form
                className="border-2 border-blue-600 p-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className=" text-red-500 text-[12px] p-1 "
                  />
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    values={values.firstName}
                     onChange={(e) => {
                      handleChange(e);
                      setServerError(''); 
                    }}
                    placeholder="First Name"
                    className='p-[2px] border-2 w-full my-2'
                  />
                </div>
                <div>
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className=" text-red-500 text-[12px] p-1 "
                  />
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    values={values.lastName}
                     onChange={(e) => {
                      handleChange(e);
                      setServerError(''); 
                    }}
                    placeholder="Last Name"
                    className='p-[2px] border-2 w-full my-2'

                  />
                </div>
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
                     onChange={(e) => {
                      handleChange(e);
                      setServerError(''); 
                    }}
                    placeholder="Email"
                    className='p-[2px] border-2 w-full my-2'

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
                     onChange={(e) => {
                      handleChange(e);
                      setServerError(''); 
                    }}
                    placeholder="Password"
                    className='p-[2px] border-2 w-full my-2'

                  />
                </div>
                <div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className=" text-red-500 text-[12px] p-1 "
                  />
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    values={values.confirmPassword}
                     onChange={(e) => {
                      handleChange(e);
                      setServerError(''); 
                    }}
                    placeholder="Confirm Password"
                    className='p-[2px] border-2 w-full my-2'

                  />
                </div>
                {serverError && (
                  <p className="text-red-500 text-[12px] p-1 text-center">{serverError}</p>
                )}
                <button type="submit" className="w-full bg-blue-600 text-white p-1">Signup</button>
                <h1 className="text-[10px] text-center py-2">Don't have an account? <Link to={'/auth/login'}><span className="text-blue-600 cursor-pointer">Login</span></Link></h1>
                <div className="flex justify-center py-2">
                <button className="bg-blue-600 rounded-md p-2 text-white text-[10px] ">Signup with <span className="font-bold">google</span></button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Signup;
