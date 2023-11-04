import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./reviewItem.module.scss";

import Rating from "@mui/material/Rating";
import Moment from "react-moment";

import { AiFillLike, AiOutlineLike } from "react-icons/ai/index";

import { reviewService, userService } from "@/services";
import { authenticationActions } from "@/store";

export const ReviewItem = ({ review }) => {
  const authen = useSelector((state) => state.authentication);
  const [likeCount, setLikeCount] = useState(review.like);
  const dispatch = useDispatch();

  const wasLiked = authen?.user?.likedReviews?.includes(review.id);

  const onLike = async () => {
    try {
      const likedReview = {
        ...review,
        like: review.like + 1,
        createdBy: review.createdBy.id,
        product: review.product.id,
      };
      const currentUser = {
        ...authen?.user,
        likedReviews: authen?.user?.likedReviews?.concat(likedReview.id),
      };

      await reviewService.update(review.id, likedReview);
      await userService.update(currentUser.id, currentUser, currentUser.token);
      dispatch(authenticationActions.update({ user: currentUser }));
      setLikeCount((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const onUnLike = async () => {
    try {
      const likedReview = {
        ...review,
        like: review.like - 1 >= 0 ? review.like - 1 : 0,
        createdBy: review.createdBy.id,
        product: review.product.id,
      };
      const currentUser = {
        ...authen?.user,
        likedReviews: authen?.user?.likedReviews?.filter(
          (item) => item !== likedReview.id
        ),
      };
      await reviewService.update(review.id, likedReview);
      await userService.update(currentUser.id, currentUser, currentUser.token);
      dispatch(authenticationActions.update({ user: currentUser }));
      setLikeCount((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src={review?.createdBy?.avatarUrl || "/images/default-avatar.png"}
        alt="user"
      />
      <div className={styles.review}>
        <h5>{review.createdBy.username}</h5>
        <Rating
          className={styles.rating}
          name="read-only"
          value={review.rating}
          readOnly
        />
        <div className={styles.content}>
          <h5>{review.title}</h5>
          <p>{review.content}</p>
          <>
            {review.images.map((img) => (
              <img key={img} src={img} alt="" className={styles.reviewImg} />
            ))}
          </>
        </div>
      </div>
      <div className={styles.left}>
        <Moment format="YYYY-MM-DD">{review.createdAt}</Moment>
        <div className={styles.isHelpful}>
          <div className={styles.like}>
            {wasLiked ? (
              <AiFillLike className={styles.icon} onClick={onUnLike} />
            ) : (
              <AiOutlineLike className={styles.icon} onClick={onLike} />
            )}
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
