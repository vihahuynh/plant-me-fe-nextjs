import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  UserLeftMenu,
  Button,
  InfoBox,
  AddressItem,
  AddressForm,
} from "@/components";

import { addressService } from "@/services";

import styles from "./deliveryAddress.module.scss";

const DeliveryAddress = () => {
  const authen = useSelector((state) => state.authentication);
  const [addresses, setAddresses] = useState([]);
  const [isShowForm, setIsShowForm] = useState(false);
  const onOpenAddressForm = () => setIsShowForm(true);
  const onCloseAddressForm = () => setIsShowForm(false);

  const onChangeDefaultAddress = async (addressToUpdate) => {
    const defaultAddress = addresses.find((a) => a.isDefault);
    if (defaultAddress?.id) {
      await addressService.update(
        defaultAddress?.id,
        { ...defaultAddress, isDefault: false },
        authen?.user?.token
      );
    }
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
  };

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

  if (!authen?.user?.id)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;

  return (
    <div className={styles.main}>
      <UserLeftMenu />
      <div className={styles.leftContainer}>
        {!isShowForm ? (
          <Button
            text="+ Add new address"
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
        <ul className={styles.addressList}>
          {addresses.map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              setAddresses={setAddresses}
              onChangeDefaultAddress={onChangeDefaultAddress}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeliveryAddress;
