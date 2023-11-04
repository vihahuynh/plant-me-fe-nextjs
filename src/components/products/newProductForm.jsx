import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Formik } from "formik";

import {
  wateringList,
  lightList,
  idealLocationList,
  whereToGrowList,
  specialFeaturesList,
  typeOfPlantsList,
} from "@/data";

import { InputGroup, SelectInput } from "@/components";

import { productService } from "@/services";

import styles from "./newProductForm.module.scss";
import "@/styles/custom.module.scss";

export const NewProductForm = () => {
  const authen = useSelector((state) => state.authentication);
  const router = useRouter();

  const [watering, setWatering] = useState(null);
  const [light, setLight] = useState(null);
  const [idealLocation, setIdealLocation] = useState([]);
  const [whereToGrow, setWhereToGrow] = useState([]);
  const [specialFeatures, setSpecialFeatures] = useState([]);
  const [typeOfPlants, setTypeOfPlants] = useState([]);
  // const [livingConditions, setLivingConditions] = useState([]);
  const [commonProblems, setCommonProblems] = useState([]);
  const [decorTips, setDecorTips] = useState([]);
  const [plantCare, setPlantCare] = useState([]);

  const onAddNewProduct = async (values) => {
    try {
      const newProduct = {
        ...values,
        // livingConditions,
        watering: watering?.text || null,
        light: light?.text || null,
        idealLocation: idealLocation?.map((item) => item.text) || [],
        whereToGrow: whereToGrow?.map((item) => item.text) || [],
        specialFeatures: specialFeatures?.map((item) => item.text) || [],
        typeOfPlants: typeOfPlants?.map((item) => item.text) || [],
        decorTips,
        commonProblems,
        plantCare,
      };
      newProduct.salePercent = values.salePercent
        ? Number(values.salePercent)
        : 0;
      delete newProduct.images;

      const formData = new FormData();
      for (const singleFile of values.images) {
        formData.append("images", singleFile);
      }
      formData.append("obj", JSON.stringify(newProduct));
      const returnedProduct = await productService.create(
        formData,
        authen?.user?.token
      );
      router.push(`/admin/products/${returnedProduct.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>New product</h2>
      <Formik
        initialValues={{
          images: [],
          title: "",
          about: "",
          price: "",
          salePercent: "",
          watering,
          light,
          idealLocation,
          specialFeatures,
          commonProblems: [],
          plantCare: [],
          decorTips: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Title is required";
          } else if (values.title.length < 5) {
            errors.title = "Title must contains at least 5 characters";
          }
          if (!values.price) {
            errors.price = "Price is required";
          } else if (isNaN(values.price)) {
            errors.price = "Invalid value";
          }
          if (values && isNaN(values?.salePercent)) {
            errors.salePercent = "Invalid value";
          }
          if (!values.about) {
            errors.about = "About is required";
          }
          if (!values.images.length) {
            errors.images = "Images is required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await onAddNewProduct(values);
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
            <div className={`${styles.inputContainer} ${styles.title}`}>
              <input
                id="tile"
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Title* (Example: Castus)"
              />
              <p className={styles.errors}>
                {errors.title && touched.title && errors.title}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.images}`}>
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
            <div className={`${styles.inputContainer} ${styles.price}`}>
              <input
                id="price"
                type="text"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                placeholder="Price* (Example: 50)"
              />
              <p className={styles.errors}>
                {errors.price && touched.price && errors.price}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.salePercent}`}>
              <input
                id="sale-percent"
                type="text"
                name="salePercent"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.salePercent}
                placeholder="Sale percent (Example: 15)"
              />
              <p className={styles.errors}>
                {errors.salePercent &&
                  touched.salePercent &&
                  errors.salePercent}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.about}`}>
              <textarea
                id="about"
                rows={6}
                type="text"
                name="about"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.about}
                placeholder="About*"
              />
              <p className={styles.errors}>
                {errors.about && touched.about && errors.about}
              </p>
            </div>
            <div className={`${styles.inputContainer} ${styles.watering}`}>
              <label className={styles.label}>Watering Schedule</label>
              <SelectInput
                listData={wateringList}
                currentOption={watering}
                setCurrentOption={setWatering}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.light}`}>
              <label className={styles.label}>Light</label>
              <SelectInput
                listData={lightList}
                currentOption={light}
                setCurrentOption={setLight}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.location}`}>
              <label className={styles.label}>Ideal plants location</label>
              <SelectInput
                listData={idealLocationList}
                currentOption={idealLocation}
                setCurrentOption={setIdealLocation}
                multiple={true}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.whereToGrow}`}>
              <label className={styles.label}>Where To Grow</label>
              <SelectInput
                listData={whereToGrowList}
                currentOption={whereToGrow}
                setCurrentOption={setWhereToGrow}
                multiple={true}
              />
            </div>
            <div
              className={`${styles.inputContainer} ${styles.specialFeatures}`}>
              <label className={styles.label}>Special Features</label>
              <SelectInput
                listData={specialFeaturesList}
                currentOption={specialFeatures}
                setCurrentOption={setSpecialFeatures}
                multiple={true}
              />
            </div>
            <div className={`${styles.inputContainer} ${styles.typeOfPlants}`}>
              <label className={styles.label}>Type of plants</label>
              <SelectInput
                listData={typeOfPlantsList}
                currentOption={typeOfPlants}
                setCurrentOption={setTypeOfPlants}
                multiple={true}
              />
            </div>
            <div className={styles.plantCare}>
              <InputGroup
                inputTitle="Plant Care"
                items={plantCare}
                setItems={setPlantCare}
              />
            </div>
            <div className={styles.commonProblems}>
              <InputGroup
                inputTitle="Common Problems"
                items={commonProblems}
                setItems={setCommonProblems}
              />
            </div>
            <div className={styles.decorTips}>
              <InputGroup
                inputTitle="Decor Tips"
                items={decorTips}
                setItems={setDecorTips}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.btn}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
