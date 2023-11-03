import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import Rating from "@mui/material/Rating";

import { addItem } from "../../store/cartSlice";
import { alertActions, cartActions } from "./../../store";

import {
  Price,
  Button,
  QuantityInput,
  Modal,
  SignInForm,
} from "./../../components";

import styles from "./buyInfo.module.scss";

const getPrice = (price, size) => {
  switch (size) {
    case "XS":
      return Math.round((price / 100) * 70);
    case "S":
      return Math.round((price / 100) * 85);
    case "M":
      return price;
    case "L":
      return Math.round((price / 100) * 115);
    case "XL":
      return Math.round((price / 100) * 130);
    default:
      return price;
  }
};

let delay;

export const BuyInfo = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);

  const [openModal, setOpenModal] = useState(false);
  const [openLightGuideModal, setOpenLightGuideModal] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [price, setPrice] = useState(0);

  const allColors = [...new Set(product?.stocks?.map((s) => s.color))];
  const allSizes = [...new Set(product?.stocks?.map((s) => s.size))];

  const [availableColors, setAvailableColors] = useState(allColors);
  const [availableSizes, setAvailableSizes] = useState(allSizes);
  const [availableQuantity, setAvailableQuantity] = useState(0);

  const dispatch = useDispatch();

  const onUpdateQuantity = (quan) => {
    if (+quan > 0 && +quan <= availableQuantity) setQuantity(+quan);
    else if (+quan <= 0) setQuantity(1);
    else setQuantity(availableQuantity);
  };

  const onAddToCartNoAuth = () => {
    if (!color || !size) {
      dispatch(
        alertActions.updateMessage({
          message: "Please choose color and size!",
          type: "warning",
        })
      );
      delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
      return;
    }
    if (
      quantity > availableQuantity ||
      !availableColors.includes(color) ||
      !availableSizes.includes(size)
    ) {
      const message = availableQuantity
        ? `Only ${availableQuantity} products available!`
        : "Out of stock";
      dispatch(alertActions.updateMessage({ message, type: "warning" }));
      delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
      return;
    }
    const cartItem = {
      product: product.id,
      title: product.title,
      price: price,
      salePercent: product.salePercent,
      image:
        product.images.find((img) => img.includes("eye")) || product.images[0],
      discount: Math.round((price * product.salePercent) / 100),
      color,
      size,
      quantity,
      isCheckout: false,
      stock: product.stocks.find((s) => s.color === color && s.size === size)
        ?.id,
    };
    dispatch(cartActions.addItem({ item: cartItem }));
    // await dispatch(
    //   addItem({ cart, item: cartItem, token: authen?.user?.token })
    // ).unwrap();
    dispatch(
      alertActions.updateMessage({
        message: "Added to cart",
        type: "info",
      })
    );
    delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
  };

  const onAddToCart = async () => {
    try {
      clearTimeout(delay);
      if (!authen?.user?.token) {
        onAddToCartNoAuth();
        return;
      }
      if (!color || !size) {
        dispatch(
          alertActions.updateMessage({
            message: "Please choose color and size!",
            type: "warning",
          })
        );
        delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
        return;
      }
      if (
        quantity > availableQuantity ||
        !availableColors.includes(color) ||
        !availableSizes.includes(size)
      ) {
        const message = availableQuantity
          ? `Only ${availableQuantity} products available!`
          : "Out of stock";
        dispatch(alertActions.updateMessage({ message, type: "warning" }));
        delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
        return;
      }
      const cartItem = {
        product: product.id,
        title: product.title,
        price: price,
        salePercent: product.salePercent,
        image:
          product.images.find((img) => img.includes("eye")) ||
          product.images[0],
        discount: Math.round((price * product.salePercent) / 100),
        color,
        size,
        quantity,
        isCheckout: false,
        stock: product.stocks.find((s) => s.color === color && s.size === size)
          ?.id,
      };
      await dispatch(
        addItem({ cart, item: cartItem, token: authen?.user?.token })
      ).unwrap();
      dispatch(
        alertActions.updateMessage({
          message: "Added to cart",
          type: "info",
        })
      );
      delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
    } catch (err) {
      console.log(err);
      onAddToCartNoAuth();
      // if (err?.response?.data?.error === "token expired" || err?.response?.data?.error === "invalid token" || err?.message === "token expired") {
      //   localStorage.removeItem("loggedUser");
      //   dispatch(authenticationActions.logout());
      //   setOpenModal(true)
      // }
    }
  };

  const rating = product?.reviews.reduce((averageRating, review) => {
    averageRating += review.rating / product?.reviews.length;
    return averageRating;
  }, 0);

  const onUpdateColor = (inputColor) => {
    const quantityInCart =
      cart.items.find(
        (item) =>
          item.color === inputColor &&
          item.size === size &&
          item.product === product.id
      )?.quantity ?? 0;
    const stockHaveColor = product.stocks.filter((s) => s.color === inputColor);
    setAvailableSizes(stockHaveColor.map((s) => s.size));
    setAvailableQuantity(
      product.stocks.find((s) => s.color === inputColor && s.size === size)
        ?.quantity - quantityInCart ?? 0
    );
    setColor(inputColor);
  };

  const onUpdateSize = (inputSize) => {
    const quantityInCart =
      cart.items.find(
        (item) =>
          item.color === color &&
          item.size === inputSize &&
          item.product === product.id
      )?.quantity ?? 0;
    const stocksHaveSize = product.stocks.filter((s) => s.size === inputSize);
    setAvailableColors(stocksHaveSize.map((s) => s.color));
    setAvailableQuantity(
      product.stocks.find((s) => s.color === color && s.size === inputSize)
        ?.quantity - quantityInCart ?? 0
    );
    setSize(inputSize);
    setPrice(getPrice(product.price, inputSize));
  };

  const sold = product?.stocks.reduce((result, stock) => {
    result = result + (stock?.sold || 0);
    return result;
  }, 0);

  return (
    <>
      <div>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.statisticContainer}>
          <span className={styles.statistic}>
            <Rating name="read-only" value={rating} readOnly />
          </span>
          <span className={styles.statistic}>
            {product.reviews.length} reviews
          </span>
          <span className={styles.statistic}>Sold: {sold}</span>
        </div>
        <Price
          price={price ? price : product.price}
          salePercent={product.salePercent}
          size="big"
          range={!size}
        />
      </div>
      <div>
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}>Size</p>
          <ul className={styles.optionList}>
            {allSizes?.map((s) => {
              const sizeClassNames = `${styles.sizeItem} ${
                size === s ? styles.active : ""
              } ${!availableSizes.includes(s) ? styles.unavailable : ""}`;
              return (
                <li
                  className={sizeClassNames}
                  key={s}
                  onClick={() => onUpdateSize(s)}>
                  {s}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}>Color</p>
          <ul className={styles.optionList}>
            {allColors.map((c) => {
              const normalStyle = {
                outline: `1px solid ${c}`,
                backgroundColor: c,
              };
              const unavailableStyles = {
                outline: "1px solid #eaedf3",
                backgroundColor: "#eaedf3",
                cursor: "not-allowed",
              };
              return (
                <li
                  style={
                    !availableColors.includes(c)
                      ? unavailableStyles
                      : normalStyle
                  }
                  className={
                    color !== c
                      ? styles.colorItem
                      : `${styles.colorItem} ${styles.active}`
                  }
                  key={c}
                  onClick={() => onUpdateColor(c)}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        {availableQuantity > 0 ? (
          <p className={styles.quantityAvailable}>
            {availableQuantity <= quantity ? (
              `${availableQuantity} products available`
            ) : (
              <span> &nbsp;</span>
            )}
          </p>
        ) : (
          <p className={styles.quantityAvailable}>
            {color && size ? "Out of stock" : <span> &nbsp;</span>}
          </p>
        )}
        <QuantityInput
          quantity={quantity}
          onChange={onUpdateQuantity}
          disabled={!availableQuantity}
        />
        <Button
          text="Add to cart"
          size="medium"
          className={styles.btn}
          onClick={onAddToCart}
        />
      </div>
      <p
        className={styles.viewLightGuide}
        onClick={() => setOpenLightGuideModal(true)}>
        view light guide
      </p>
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
      {typeof window === "object" &&
        ReactDOM.createPortal(
          <Modal
            isOpen={openLightGuideModal}
            size="full"
            showButtonGroup={false}
            onCancel={() => setOpenLightGuideModal(false)}>
            <img
              className={styles.imageModal}
              src="/images/view-light-guide.png"
              alt="light-guide"
            />
            <span className={styles.closeBtn}></span>
          </Modal>,
          document.getElementById("overlay-root")
        )}
    </>
  );
};
