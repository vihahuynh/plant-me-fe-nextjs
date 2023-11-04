import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { reviewsFilterOptions, reviewsSortOptions } from "@/data";

import {
  UserLeftMenu,
  UserReviewItem,
  ProductToReview,
  FilterDrawer,
  SortDrawer,
  Arrow,
  Pagination,
  InfoBox,
  Loading,
} from "@/components";

import { reviewService, orderService } from "@/services";

import Slider from "react-slick";

import styles from "./reviewHistory.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewHistory = () => {
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [filterReviews, setFilterReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authen = useSelector((state) => state.authentication);
  const queries = "";
  // const queries = history.location.search.slice(1);
  const otherQueries = queries
    .split("&")
    .filter((q) => !q.includes("skip") && !q.includes("limit"))
    .join("&");

  const settings = {
    className: "center",
    arrow: true,
    slidesToShow:
      products.length > 0 && products.length < 3 ? products.length : 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <Arrow type="prev" />,
    prevArrow: <Arrow type="next" />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const reviewsData = await reviewService.getAll(
          `user=${authen?.user?.id}`,
          authen?.user?.token
        );
        setAllReviews(reviewsData.data);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setIsLoading(false), 0);
      }
    };
    fetchData();
  }, [authen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const reviewsData = await reviewService.getAll(
          `user=${authen?.user?.id}&${otherQueries}`,
          authen?.user?.token
        );
        setFilterReviews(reviewsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, otherQueries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const reviewsData = await reviewService.getAll(
          `createdBy=${authen?.user?.id}&${queries}`,
          authen?.user?.token
        );
        setReviews(reviewsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, queries]);

  useEffect(() => {
    const reviewIds = allReviews.map((review) => review.product.id);
    const fetchData = async () => {
      try {
        if (authen?.user) {
          const ordersData = await orderService.getAll(
            `user=${authen?.user?.id}`,
            authen?.user?.token
          );
          const productsNeedToReview = ordersData.data.reduce(
            (result, order) => {
              order.cart.forEach((p) => {
                const itemIds = result.map((i) => i.product);
                if (
                  !itemIds.includes(p.product) &&
                  !reviewIds.includes(p.product)
                ) {
                  result = result.concat(p);
                }
              });
              return result;
            },
            []
          );
          setProducts(productsNeedToReview);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [authen?.user, allReviews, reviews]);

  if (isLoading) return <Loading />;

  if (!authen.user?.id)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;

  return (
    <div className={styles.main}>
      <UserLeftMenu />
      <div className={styles.container}>
        <h3>Products to review</h3>
        {products.length ? (
          <div className={styles["thumbnail-slider-wrap"]}>
            <Slider {...settings}>
              {products.map((p) => (
                <ProductToReview
                  key={p.product}
                  product={p}
                  setReviews={setReviews}
                />
              ))}
            </Slider>
          </div>
        ) : (
          <p className={styles.infoText}>No product to review</p>
        )}
        <div className={styles.allReviews}>
          <h3>My Reviews</h3>
          <div className={styles.header}>
            <div className={styles.btnContainers}>
              <div className={styles.btn}>
                <SortDrawer sortOptions={reviewsSortOptions} />
              </div>
              <div className={styles.btn}>
                <FilterDrawer filterOptions={reviewsFilterOptions} />
              </div>
            </div>
          </div>
          {reviews.length ? (
            <>
              <ul className={styles.reviewsList}>
                {reviews.map((review) => (
                  <UserReviewItem key={review.id} item={review} />
                ))}
              </ul>
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={Math.ceil(filterReviews.length / 10)}
                itemsPerPage={10}
                theme="white"
              />
            </>
          ) : (
            <p className={styles.infoText}>No review found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewHistory;
