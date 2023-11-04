import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import styles from "./cartSummary.module.scss";

import { Button, LinkButton } from "@/components";

import { addressService, locationService } from "@/services";

export const CartSummary = ({ title, onClick, disabled = false }) => {
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);
  const [address, setAddress] = useState();
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressesData = await addressService.getAll(authen?.user?.token);
        setAddress(addressesData.data.find((a) => a.isDefault));
      } catch (err) {
        console.log(err);
      }
    };
    if (authen?.user?.token) fetchData();
  }, [authen?.user?.token]);

  useEffect(() => {
    const getDeliveryCharges = async () => {
      const weight = cart.items.reduce((total, item) => {
        if (!item.isCheckout) return total;
        switch (item.size) {
          case "XS":
            return (total += 200 * item.quantity);
          case "S":
            return (total += 300 * item.quantity);
          case "M":
            return (total += 400 * item.quantity);
          case "L":
            return (total += 600 * item.quantity);
          case "XL":
            return (total += 800 * item.quantity);
          default:
            return (total += 400 * item.quantity);
        }
      }, 0);
      try {
        const data = await locationService.getDeliveryCharge(
          address.district.value,
          address.ward.value,
          weight
        );
        console.log("data: ", data.data);
        setDeliveryCharges(Math.ceil(data.data.data.total / 1000));
      } catch (err) {
        console.log(err);
        setDeliveryCharges(30);
      }
    };

    if (address) getDeliveryCharges();
  }, [address, cart]);

  const subTotal = cart.items
    .filter((item) => item.isCheckout)
    .reduce(
      (total, item) =>
        (total +=
          Math.round(item.price - (item.salePercent * item.price) / 100) *
          item.quantity),
      0
    );

  const fullAddress = address
    ? `${address.address}, ${address.ward.text}, ${address.district.text}, ${address.province.text}`
    : "";

  return (
    <div className={styles.summary}>
      <div className={styles.summaryTop}>
        {!!authen?.user?.token && (
          <div className={styles.delivery}>
            <LinkButton
              url="/cart/change-delivery-address"
              text={address ? "Change" : "Add"}
              size="small"
              className={styles.change}
            />
            <h5>Delivery to</h5>
            {address ? (
              <>
                <div className={styles.userInfo}>
                  <p>{address?.name}</p>
                  <p>{address?.phoneNumber}</p>
                </div>
                <p className={styles.address}>{fullAddress}</p>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
        <div className={styles.orderSummary}>
          <h5>
            Order Summary
            {!cart.items.some((item) => item.isCheckout) && (
              <p className={styles.infoText}>(No products selected)</p>
            )}
          </h5>

          <div className={styles.subTotal}>
            <p className={styles.summarySubTitle}>Subtotal</p>
            {subTotal ? <p>{subTotal}.000 &#x20ab;</p> : <p>0 &#x20ab;</p>}
          </div>
          <div className={styles.shipping}>
            <p className={styles.summarySubTitle}>Shipping</p>
            <p>
              {deliveryCharges & subTotal ? `${deliveryCharges}.000` : 0}{" "}
              &#x20ab;
            </p>
          </div>
          <div className={styles.total}>
            <p className={styles.summarySubTitle}>Total</p>
            {subTotal ? (
              <p className={styles.totalPrice}>
                {subTotal + deliveryCharges}.000 &#x20ab;
              </p>
            ) : (
              <p className={styles.totalPrice}>0 &#x20ab;</p>
            )}
          </div>
        </div>
      </div>
      <Button
        borderRadius="square"
        text={title}
        size="medium"
        className={styles.checkoutBtn}
        onClick={() => {
          if (!disabled) onClick();
        }}
        disabled={disabled}
      />
    </div>
  );
};
