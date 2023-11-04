import { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";

import { passwordResetService } from "@/services/passwordReset";

import styles from "@/pages/signin/signInSignUp.module.scss";

const PasswordReset = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { userId, token } = router.query;

  const onChangeEmail = async (values) => {
    try {
      await passwordResetService.updatePassword(userId, token, values);
      router.push("/signin");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.err || "Something went wrong!");
    }
  };

  return (
    <div className={styles.container}>
      <img src="/images/blog-4.png" alt="plant-care" />
      <div className={styles.formContainer}>
        <h2>Change password</h2>
        <p className={styles.bigError}>{!!error && error}</p>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.confirmPassword) {
              errors.confirmPassword = "Confirm password is required";
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Please enter the same password.";
            }

            if (!values.password) {
              errors.password = "Password is required";
            } else if (values?.password?.length < 8) {
              errors.password = "Password must contain at least 8 characters";
            }

            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await onChangeEmail(values);
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
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
                />
                <p className={styles.errors}>
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  placeholder="Confirm password"
                />
                <p className={styles.errors}>
                  {errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword}
                </p>
              </div>
              <button
                type="submit"
                className={!isSubmitting ? styles.btn : styles.disabledBtn}>
                change password
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordReset;
