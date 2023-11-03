import { useEffect, useState } from "react";

import { LinkButton, Button } from "./../../components";
import { productService } from "../../services";

import styles from "./productsTable.module.scss";

export const ProductTable = () => {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await productService.getAll();
        setProduct(productData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  console.log(products);
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Sale percent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr className={styles.tableRow}>
              <td>{product.title}</td>
              <td>
                <img
                  className={styles.img}
                  src={
                    product.images.find((i) => i.includes("eye")) ||
                    product.images[0]
                  }
                  alt=""
                />
              </td>
              <td>{product.price}.000 &#x20ab;</td>
              <td>{product.salePercent}%</td>
              <td>
                <div className={styles.btnGroup}>
                  <LinkButton
                    text="Edit"
                    url={`/admin/products/${product.id}?mode=edit`}
                    size="small"
                    borderRadius="square"
                    theme="blue"
                  />
                  <LinkButton
                    text="View details"
                    size="small"
                    borderRadius="square"
                    theme="light"
                    url={`/admin/products/${product.id}`}
                  />
                  <Button
                    text="Delete"
                    size="small"
                    borderRadius="square"
                    theme="red"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
