import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import Link from "next/link";

import { loginService } from "../../services";
import { authenticationActions } from "../../store";

import styles from "./signInForm.module.scss";

export const SignInForm = ({ title, setOpenModal }) => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const onLogin = async (values) => {
    try {
      const result = await loginService.login(values);
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          isLoggedIn: !!result.data,
          user: result.data,
        })
      );
      dispatch(authenticationActions.login({ user: result.data }));
    } catch (err) {
      const errorMessage = err?.response?.data?.err;
      setError(errorMessage || "Some thing went wrong!");
    }
    setOpenModal(false);
  };

  return (
    <div className={styles.smallContainer}>
      <div className={styles.formContainer}>
        <h5>{title}</h5>
        <Link className={styles.url} href="/signup">
          Do not have an account?
        </Link>
        <p className={styles.bigError}>{!!error && error}</p>
        <Formik
          initialValues={{ loginData: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.loginData) {
              errors.loginData = "Username/Email is required";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (values?.password?.length < 8) {
              errors.password = "Password must contain at least 8 characters";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await onLogin(values);
            setTimeout(() => {
              setSubmitting(false);
            }, 500);
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  name="loginData"
                  onChange={(e) => {
                    handleChange(e);
                    setError("");
                  }}
                  onBlur={handleBlur}
                  value={values.loginData}
                  placeholder="User/Email"
                />
                <p className={styles.errors}>
                  {errors.loginData && touched.loginData && errors.loginData}
                </p>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => {
                    handleChange(e);
                    setError("");
                  }}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                <p className={styles.errors}>
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={!isSubmitting ? styles.btn : styles.disabledBtn}>
                Sign in
              </button>
              <Link href="/password-reset" className={styles.link}>
                Forgot password?
              </Link>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
