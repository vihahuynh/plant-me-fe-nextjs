import { useState } from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs/index";

import { authenticationActions } from "../../store";
import { Price, SignInForm, Modal } from "./../../components";

import { userService } from "../../services";

import styles from "./productItem.module.scss";

export const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authen = useSelector((state) => state.authentication);
  const wasLiked = authen?.user?.likedProducts?.includes(product.id);
  const [openModal, setOpenModal] = useState(false);

  const onLike = async () => {
    try {
      const currentUser = {
        ...authen.user,
        likedProducts: [
          ...new Set(authen.user?.likedProducts?.concat(product.id)),
        ],
      };
      await userService.update(currentUser.id, currentUser, currentUser.token);
      dispatch(authenticationActions.update({ user: currentUser }));
    } catch (err) {
      if (err?.response?.data?.error === "token expired") {
        localStorage.removeItem("loggedUser");
        dispatch(authenticationActions.logout());
        setOpenModal(true);
      }
    }
  };

  const onUnlike = async () => {
    try {
      const currentUser = {
        ...authen.user,
        likedProducts: authen.user?.likedProducts?.filter(
          (item) => item !== product.id
        ),
      };
      await userService.update(currentUser.id, currentUser, currentUser.token);
      dispatch(authenticationActions.update({ user: currentUser }));
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error === "token expired") {
        localStorage.removeItem("loggedUser");
        dispatch(authenticationActions.logout());
        setOpenModal(true);
      }
    }
  };
  const goToDetailsPage = () => {
    router.push(`/products/${product?.id}`);
  };

  const imageUrl =
    product?.images?.find((img) => img?.includes("eye")) ||
    product?.images[0] ||
    "";

  return (
    <div className={styles.productContainer}>
      {!!authen?.user?.token && (
        <div className={styles.iconContainer}>
          {!wasLiked ? (
            <BsSuitHeart className={styles.icon} onClick={onLike} />
          ) : (
            <BsSuitHeartFill className={styles.icon} onClick={onUnlike} />
          )}
        </div>
      )}
      <div className={styles.imgContainer}>
        <img src={imageUrl} alt={product.name} onClick={goToDetailsPage} />
      </div>
      <div className={styles.productDetails}>
        <p>{product.title}</p>
        <Price
          price={product.price}
          salePercent={product.salePercent}
          range={true}
        />
      </div>
      {typeof window === "object" &&
        ReactDOM.createPortal(
          <Modal
            isOpen={openModal}
            size="medium"
            showButtonGroup={false}
            onCancel={() => setOpenModal(false)}>
            <SignInForm setOpenModal={setOpenModal} />
          </Modal>,
          document.getElementById("overlay-root")
        )}
    </div>
  );
};
