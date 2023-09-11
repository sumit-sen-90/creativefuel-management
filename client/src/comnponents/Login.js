import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "./Popup/ErrorPopup";
import styles from "./Login.module.css";
import { admin_credentials } from "../utils/constant";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (values) => {
    if (
      values.email !== admin_credentials.email ||
      values.password !== admin_credentials.password
    ) {
      setShowErrorModal(true);
    } else {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    if (isLogin) {
      localStorage.setItem("isLoggedin", "true");
      navigate("/dashboard");
    }
  }, [isLogin, navigate]);

  return (
    <div className={styles.login_main_div}>
      <div className={`container justify`}>
        <div className="row justify-content-center">
          <div className={`col-md-6 ${styles.container}`}>
            <h2 className="mt-5 mb-4 text-center">Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="d-flex flex-column align-items-center">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control mb-3"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control mb-3"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <ErrorPopup
          showErrorModal={showErrorModal}
          setShowErrorModal={setShowErrorModal}
          ErrorTitle={"Error"}
          ErrorMessage={
            " Invalid credentials. Please provide valid email and password."
          }
        />
      </div>
    </div>
  );
};

export default Login;
