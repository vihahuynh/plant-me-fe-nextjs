import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "./productDetails.module.scss";
import {
  Reviews,
  Features,
  ImageCarousel,
  BuyInfo,
  ProductInfo,
  Loading,
  InfoBox,
} from "@/components";

import { productService } from "@/services";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const returnProduct = await productService.get(id);
        setProduct(returnProduct?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) return <Loading />;

  if (!product) {
    return (
      <InfoBox text="No item found" btnText="Back to shopping" url="/shop" />
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.images}>
          <ImageCarousel images={product.images} />
        </div>
        <div className={styles.info}>
          <BuyInfo product={product} />
        </div>
        <div className={styles.details}>
          <ProductInfo product={product} />
        </div>
        <div className={styles.reviews}>
          <Reviews productId={product.id} />
        </div>
        <div className={styles.features}>
          <h2>Why People Choose Us?</h2>
          <Features />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
