import { useState, useEffect } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";

import { Button, SelectInput } from "@/components";

import { addressService, locationService } from "@/services";

import styles from "./addressForm.module.scss";

export const AddressForm = ({
  address,
  showCancel = true,
  onCancel,
  setAddresses,
  setAddress,
}) => {
  const authen = useSelector((state) => state.authentication);
  const [provinces, setProvinces] = useState([]);
  const [curProvince, setCurProvince] = useState();
  const [districts, setDistricsts] = useState([]);
  const [curDistrict, setCurDistrict] = useState();
  const [wards, setWards] = useState([]);
  const [curWard, setCurWard] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const provinceData = await locationService.getProvinces();
      setProvinces(
        provinceData.data.data.map((p) => {
          return { text: p.ProvinceName, value: p.ProvinceID };
        })
      );
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const districtData = await locationService.getDistricts(
        curProvince.value
      );
      setDistricsts(
        districtData.data.data.map((p) => {
          return { text: p.DistrictName, value: p.DistrictID };
        })
      );
    };
    if (curProvince?.value) fetchData();
  }, [curProvince]);

  useEffect(() => {
    const fetchData = async () => {
      const wardData = await locationService.getWards(curDistrict.value);
      setWards(
        wardData.data.data.map((p) => {
          return { text: p.WardName, value: p.WardCode };
        })
      );
    };
    if (curDistrict?.value) fetchData();
  }, [curDistrict]);

  const onAddNewAddressNoAuth = (values) => {
    setAddress({
      ...values,
      province: curProvince,
      district: curDistrict,
      ward: curWard,
    });
  };

  const onAddNewAddress = async (values) => {
    try {
      if (!authen?.user?.token) {
        onAddNewAddressNoAuth(values);
        return;
      }
      const address = {
        ...values,
        province: curProvince,
        district: curDistrict,
        ward: curWard,
      };
      const newAddress = await addressService.create(
        address,
        authen?.user?.token
      );
      setAddresses((prev) => prev.concat(newAddress.data));
    } catch (err) {
      console.log(err);
    } finally {
      onCancel();
    }
  };

  const onUpdateAddress = async (id, values) => {
    try {
      const address = {
        ...values,
        province: curProvince,
        district: curDistrict,
        ward: curWard,
      };
      const updatedAddress = await addressService.update(
        id,
        address,
        authen?.user?.token
      );
      setAddresses((prev) =>
        prev.map((a) => (a.id !== id ? a : updatedAddress.data))
      );
    } catch (err) {
      console.log(err);
    } finally {
      onCancel();
    }
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{
          name: address?.name || "",
          phoneNumber: address?.phoneNumber || "",
          address: address?.address || "",
          email: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Full name is required";
          } else if (values.name.length < 5) {
            errors.name = "Full name must contains at least 5 characters";
          }

          if (!values.phoneNumber) {
            errors.phoneNumber = "Phone number is required";
          } else if (
            !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(
              values.phoneNumber
            )
          ) {
            errors.phoneNumber = "Invalid phone number";
          }

          if (!values.address) {
            errors.address = "Address is required";
          }
          if (!authen?.user?.token) {
            if (!values.email) {
              errors.email = "Email address is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          if (address) await onUpdateAddress(address?.id, values);
          else await onAddNewAddress(values);
          setTimeout(() => {
            setSubmitting(false);
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
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Full name"
              />
              <p className={styles.errors}>
                {errors.name && touched.name && errors.name}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                placeholder="Phone number"
              />
              <p className={styles.errors}>
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </p>
            </div>
            {!authen?.user?.token && (
              <div className={styles.inputContainer}>
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Email"
                />
                <p className={styles.errors}>
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
            )}

            <div className={`${styles.inputContainer} ${styles.location}`}>
              <SelectInput
                listData={provinces}
                currentOption={curProvince}
                setCurrentOption={setCurProvince}
                placeholder="City"
                theme={address ? "light" : "primary"}
              />
            </div>

            {!!curProvince?.value && (
              <div className={`${styles.inputContainer} ${styles.location}`}>
                <SelectInput
                  listData={districts}
                  currentOption={curDistrict}
                  setCurrentOption={setCurDistrict}
                  placeholder="District"
                  theme={address ? "light" : "primary"}
                />
              </div>
            )}

            {!!curDistrict?.value && (
              <div className={`${styles.inputContainer} ${styles.location}`}>
                <SelectInput
                  listData={wards}
                  currentOption={curWard}
                  setCurrentOption={setCurWard}
                  placeholder="Ward"
                  theme={address ? "light" : "primary"}
                />
              </div>
            )}

            {!!curWard?.value && (
              <div className={styles.inputContainer}>
                <input
                  id="address"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  placeholder="Address"
                />
                <p className={styles.errors}>
                  {errors.address && touched.address && errors.address}
                </p>
              </div>
            )}

            <div className={styles.formBtnGroup}>
              {showCancel && (
                <Button
                  className={isSubmitting ? styles.submittingBtn : ""}
                  type="submit"
                  text="Cancel"
                  size="small"
                  borderRadius="square"
                  theme="light"
                  onClick={onCancel}
                />
              )}
              <Button
                className={isSubmitting ? styles.submittingBtn : ""}
                type="submit"
                text={address ? "Update" : "Save"}
                size="small"
                borderRadius="square"
                disabled={isSubmitting}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
