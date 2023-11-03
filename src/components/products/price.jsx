import styles from "./price.module.scss";

export const Price = ({
  price,
  salePercent = 0,
  size = "medium",
  range = false,
}) => {
  const netPrice = Math.round(price - (price * salePercent) / 100);
  let minNetPrice;
  let maxNetPrice;
  let minGrossPrice;
  let maxGrossPrice;

  let className;
  if (size === "medium") className = styles.priceMediumContainer;
  else if (size === "small") className = styles.priceSmallContainer;
  else className = styles.priceLargeContainer;

  if (range) {
    minNetPrice = Math.round((netPrice / 100) * 70);
    maxNetPrice = Math.round((netPrice / 100) * 130);
    minGrossPrice = Math.round((price / 100) * 70);
    maxGrossPrice = Math.round((price / 100) * 130);
  }

  return (
    <>
      {!range ? (
        <div className={className}>
          {!!salePercent ? (
            <>
              <span className={styles.price}>{price}.000 &#x20ab;</span>
              <span className={styles.priceNet}>{netPrice}.000 &#x20ab;</span>
              <span className={styles.salePercent}>
                (&minus;{salePercent}%)
              </span>
            </>
          ) : (
            <span className={styles.priceNet}>{price}.000 &#x20ab;</span>
          )}
        </div>
      ) : (
        <div className={className}>
          {!!salePercent ? (
            <div className={styles.range}>
              <span className={styles.priceNet}>
                {minNetPrice}.000 &#x20ab; - {maxNetPrice}.000 &#x20ab;
              </span>
              <div className={styles.subInfo}>
                <span className={styles.price}>
                  {minGrossPrice}.000 &#x20ab; - {maxGrossPrice}.000 &#x20ab;
                </span>
                <span className={styles.salePercent}>
                  (&minus;{salePercent}%)
                </span>
              </div>
            </div>
          ) : (
            <span className={styles.priceNet}>
              {minNetPrice}.000 &#x20ab; - {maxNetPrice}.000 &#x20ab;
            </span>
          )}
        </div>
      )}
    </>
  );
};
