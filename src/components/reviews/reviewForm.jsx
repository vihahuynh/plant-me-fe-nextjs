import { Formik } from "formik";
import { Button } from "@/components";

import styles from "./reviewForm.module.scss";

export const ReviewForm = ({ onSave, onCancel, rating }) => {
  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          title: "",
          content: "",
          rating: rating,
          images: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Title is required";
          } else if (values.title.length < 5) {
            errors.title = "Title must contains at least 5 characters";
          }

          if (!values.content) {
            errors.content = "Content is required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await onSave(values);
          setTimeout(() => {
            setSubmitting(false);
            values = {
              title: "",
              content: "",
              images: [],
            };
          }, 400);
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
                id="tile"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Review title*"
              />
              <p className={styles.errors}>
                {errors.title && touched.title && errors.title}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.fileInput}
                id="images"
                multiple
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) => (values.images = e.target.files)}
                onBlur={handleBlur}
              />
              <p className={styles.errors}>
                {errors.images && touched.images && errors.images}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <textarea
                id="content"
                rows={3}
                type="text"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                placeholder="Review content*"
              />
              <p className={styles.errors}>
                {errors.content && touched.content && errors.content}
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <Button
                type="submit"
                text="Save"
                size="small"
                borderRadius="square"
                disabled={isSubmitting}
              />
              <Button
                theme="light"
                text="Cancel"
                size="small"
                borderRadius="square"
                onClick={onCancel}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
