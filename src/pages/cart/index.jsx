import { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { updateItem } from "@/store/cartSlice";
import { alertActions, cartActions } from "@/store";
import { cartService, stockService } from "@/services";

import {
  Cart,
  CartSummary,
  Wrapper,
  InfoBox,
  Modal,
  SignInForm,
} from "@/components";

import styles from "./cart.module.scss";

let delay;

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onCheckoutNoAuth = async () => {
    setIsLoading(true);
    try {
      if (!cart?.items?.find((item) => item.isCheckout)) {
        clearTimeout(delay);
        dispatch(
          alertActions.updateMessage({
            message: "Please select at least one item to checkout",
            type: "warning",
          })
        );
        delay = setTimeout(() => {
          dispatch(alertActions.clear());
        }, 4000);
      } else {
        let allowCheckout = true;
        for (let item of cart?.items) {
          const stockData = await stockService.get(item.stock);
          if (stockData?.data?.quantity < item.quantity) {
            allowCheckout = false;
            const cartItem = { ...item, isCheckout: false };
            dispatch(cartActions.updateItem({ item: cartItem }));
          }
        }
        if (!allowCheckout) {
          clearTimeout(delay);
          dispatch(
            alertActions.updateMessage({
              message: "Some products do not have enough quantity",
              type: "warning",
            })
          );
          delay = setTimeout(() => {
            dispatch(alertActions.clear());
          }, 4000);
        } else {
          router.push("/checkout");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onCheckout = async () => {
    setIsLoading(true);
    try {
      if (!authen?.user?.token) {
        onCheckoutNoAuth();
        return;
      }
      if (!cart?.items?.find((item) => item.isCheckout)) {
        clearTimeout(delay);
        dispatch(
          alertActions.updateMessage({
            message: "Please select at least one item to checkout",
            type: "warning",
          })
        );
        delay = setTimeout(() => {
          dispatch(alertActions.clear());
        }, 4000);
      } else {
        let allowCheckout = true;
        const cartData = await cartService.get(
          authen?.user?.cart,
          authen?.user?.token
        );
        dispatch(cartActions.updateCart({ cart: cartData.data }));
        for (let item of cart?.items) {
          const stockData = await stockService.get(item.stock);
          if (stockData?.data?.quantity < item.quantity) {
            allowCheckout = false;
            const cartToUpdate = { ...cart };
            const cartItem = { ...item, isCheckout: false };
            await dispatch(
              updateItem({
                cart: cartToUpdate,
                item: cartItem,
                token: authen?.user?.token,
              })
            ).unwrap();
          }
        }
        if (!allowCheckout) {
          clearTimeout(delay);
          dispatch(
            alertActions.updateMessage({
              message: "Some products do not have enough quantity",
              type: "warning",
            })
          );
          delay = setTimeout(() => {
            dispatch(alertActions.clear());
          }, 4000);
        } else {
          router.push("/checkout");
        }
      }
    } catch (err) {
      console.log(err);
      onCheckoutNoAuth();
      // if (err?.response?.data?.error === "token expired" || err?.response?.data?.error === "invalid token" || err?.message === "token expired") {
      //   localStorage.removeItem("loggedUser");
      //   dispatch(authenticationActions.logout());
      //   setOpenModal(true)
      // }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!!cart.items.length ? (
        <div className={styles.container}>
          <Cart />
          <CartSummary
            title="CHECKOUT"
            onClick={onCheckout}
            disabled={isLoading || !cart.items.some((item) => item.isCheckout)}
          />
        </div>
      ) : (
        <InfoBox text="No items found" btnText="Back to shopping" url="/shop" />
      )}
      {typeof window === "object" &&
        ReactDOM.createPortal(
          <Modal
            isOpen={openModal}
            size="medium"
            showButtonGroup={false}
            onCancel={() => setOpenModal(false)}>
            <SignInForm
              title={
                authen?.user?.token
                  ? "Token expired, please sign in again"
                  : "Please sign in to continue"
              }
              setOpenModal={setOpenModal}
            />
          </Modal>,
          document.getElementById("overlay-root")
        )}
    </>
  );
};

export default CartPage;
