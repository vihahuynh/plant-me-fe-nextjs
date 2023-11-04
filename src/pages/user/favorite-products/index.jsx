import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Wrapper,
  UserLeftMenu,
  Products,
  InfoBox,
  Loading,
} from "@/components";

import { productService } from "@/services";

import styles from "./favoriteProducts.module.scss";

const FavoriteProducts = () => {
  const authen = useSelector((state) => state.authentication);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [];

        for (const id of authen?.user?.likedProducts || []) {
          promises.push(productService.get(id));
        }

        const productsData = await Promise.all(promises);
        setProducts(productsData.filter((p) => !!p).map((p) => p.data));
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setIsLoading(false), 0);
      }
    };
    fetchData();
  }, [authen?.user?.likedProducts]);

  if (isLoading) return <Loading />;

  if (!authen?.user?.token)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;

  return (
    <div className={styles.main}>
      <UserLeftMenu />
      <div>
        <h2>My favorite products</h2>
        {products.length ? (
          <Products products={products} />
        ) : (
          <p className={styles.infoText}>No favorite product found</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteProducts;
