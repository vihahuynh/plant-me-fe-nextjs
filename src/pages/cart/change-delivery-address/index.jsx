import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { AddressItem, AddressForm, Button } from "@/components";

import { addressService } from "@/services";

import styles from "./changeDeliveryAddress.module.scss";

const ChangeDeliveryAddress = () => {
  const authen = useSelector((state) => state.authentication);
  const [addresses, setAddresses] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const onOpenAddressForm = () => setIsShowForm(true);
  const onCloseAddressForm = () => setIsShowForm(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressesData = await addressService.getAll(authen?.user?.token);
        setAddresses(addressesData.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (authen?.user?.token) fetchData();
  }, [authen?.user?.token]);

  const onChangeDefaultAddress = async (addressToUpdate) => {
    try {
      const defaultAddress = addresses.find((a) => a.isDefault);
      await addressService.update(
        defaultAddress.id,
        { ...defaultAddress, isDefault: false },
        authen?.user?.token
      );
      await addressService.update(
        addressToUpdate.id,
        { ...addressToUpdate, isDefault: true },
        authen?.user?.token
      );
      setAddresses((prev) =>
        prev
          .map((a) => (a.isDefault ? { ...a, isDefault: false } : a))
          .map((a) =>
            a.id === addressToUpdate.id
              ? { ...addressToUpdate, isDefault: true }
              : a
          )
      );
      router.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <h2>
        {addresses.length
          ? "Select the available address below: "
          : "Add new address"}
      </h2>
      <ul className={styles.addressList}>
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            setAddresses={setAddresses}
            onChangeDefaultAddress={onChangeDefaultAddress}
            btnText="Ship to this address"
            defaultText="Chosen"
            isShowAll={true}
          />
        ))}
      </ul>
      <div className={styles.addNewAddress}>
        {!!addresses.length && (
          <p className={styles.text}>Want to deliver to another address?</p>
        )}
        {!isShowForm ? (
          <Button
            text="+ Add new shipping address"
            size="full"
            borderRadius="square"
            theme="white"
            onClick={onOpenAddressForm}
          />
        ) : (
          <AddressForm
            onCancel={onCloseAddressForm}
            setAddresses={setAddresses}
          />
        )}
      </div>
    </div>
  );
};

export default ChangeDeliveryAddress;
