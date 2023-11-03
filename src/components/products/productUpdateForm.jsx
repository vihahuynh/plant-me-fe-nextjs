import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Formik } from "formik";

import { MdCancel } from "react-icons/md";

import {
  wateringList,
  lightList,
  idealLocationList,
  whereToGrowList,
  specialFeaturesList,
  typeOfPlantsList,
} from "./../../data";

import { productService } from "../../services";
import { InputGroup, Stocks, SelectInput, InfoBox } from "../../components";

import styles from "./productUpdateForm.module.scss";
import "./../../styles/custom.module.scss";

export const UpdateProductForm = () => {
  const router = useRouter();
  const id = router.query.id;
  const authen = useSelector((state) => state.authentication);
  const [product, setProduct] = useState();
  const [productImages, setProductImages] = useState([]);

  const [watering, setWatering] = useState(null);
  const [light, setLight] = useState(null);
  const [idealLocation, setIdealLocation] = useState([]);
  const [whereToGrow, setWhereToGrow] = useState([]);
  const [specialFeatures, setSpecialFeatures] = useState([]);
  const [typeOfPlants, setTypeOfPlants] = useState([]);

  const [commonProblems, setCommonProblems] = useState([]);
  const [decorTips, setDecorTips] = useState([]);
  const [plantCare, setPlantCare] = useState([]);

  const onDeleteImage = (img) =>
    setProductImages((prev) => prev.filter((i) => i !== img));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await productService.get(id);
        setProduct(productData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setWatering(
      product?.watering
        ? { text: product?.watering, value: product?.watering }
        : null
    );
    setLight(
      product?.light ? { text: product?.light, value: product?.light } : null
    );
    setIdealLocation(
      product?.idealLocation?.map((item) => {
        return { text: item, value: item };
      }) || []
    );
    setWhereToGrow(
      product?.whereToGrow?.map((item) => {
        return { text: item, value: item };
      }) || []
    );
    setSpecialFeatures(
      product?.specialFeatures?.map((item) => {
        return { text: item, value: item };
      }) || []
    );
    setTypeOfPlants(
      product?.typeOfPlants?.map((item) => {
        return { text: item, value: item };
      }) || []
    );
    setCommonProblems(product?.commonProblems || []);
    setDecorTips(product?.decorTips || []);
    setPlantCare(product?.plantCare || []);
    setProductImages(product?.images || []);
  }, [product]);

  const onUpdateProduct = async (values) => {
    try {
      const productToUpdate = {
        ...values,
        watering: watering?.text || "",
        light: light?.text || "",
        idealLocation: idealLocation?.map((item) => item.text) || [],
        whereToGrow: whereToGrow?.map((item) => item.text) || [],
        specialFeatures: specialFeatures?.map((item) => item.text) || [],
        typeOfPlants: typeOfPlants?.map((item) => item.text) || [],
        decorTips,
        commonProblems,
        plantCare,
        productImages: productImages,
      };
      delete productToUpdate.stocks;
      delete productToUpdate.reviews;

      productToUpdate.salePercent = values.salePercent
        ? Number(values.salePercent)
        : 0;
      delete productToUpdate.images;

      const formData = new FormData();
      for (const singleFile of values.images) {
        formData.append("images", singleFile);
      }
      formData.append("obj", JSON.stringify(productToUpdate));
      const returnedProduct = await productService.update(
        product?.id,
        formData,
        authen?.user?.token
      );
      setProduct(returnedProduct.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product)
    return (
      <InfoBox text="No product found" btnText="Back to home page" url="/" />
    );
  return (
    <>
      <div className={styles.formContainer}>
        <h2>Update product ID: #{product.id}</h2>
        <Formik
          initialValues={product}
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
            await onUpdateProduct(values);
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
                <div className={styles.imgs}>
                  {productImages?.map((img) => (
                    <div className={styles.imgBox} key={img}>
                      <MdCancel
                        className={styles.icon}
                        onClick={() => onDeleteImage(img)}
                      />
                      <img className={styles.img} src={img} alt="" />
                    </div>
                  ))}
                </div>
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
              <div
                className={`${styles.inputContainer} ${styles.typeOfPlants}`}>
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
                Update
              </button>
            </form>
          )}
        </Formik>
      </div>
      <Stocks product={product} />
    </>
  );
};
