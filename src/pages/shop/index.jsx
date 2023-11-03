import { useState, useEffect } from "react";

import { plantsFilterOptions, plantsSortOptions } from "../../data";

import {
  Products,
  Pagination,
  SortDrawer,
  FilterDrawer,
  Loading,
} from "../../components";
import { productService } from "../../services";

import styles from "./shop.module.scss";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [page, setPage] = useState(1);
  let queries = "skip=0&limit=12";
  // if (window !== undefined) {
  //   queries = window?.location?.search?.slice(1);
  // }
  const otherQueries = queries
    .split("&")
    .filter((q) => !q.includes("skip") && !q.includes("limit"))
    .join("&");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await productService.getAll(otherQueries);
        setFilterProducts(productsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [otherQueries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (queries.includes("skip") && queries.includes("limit")) {
          const productsData = await productService.getAll(queries);
          setProducts(productsData.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setIsLoading(false), 100);
      }
    };
    fetchData();
  }, [queries]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* <ScrollToTop locationY={0} /> */}
      <div className={styles.container}>
        <div className={styles.btnContainers}>
          <div className={styles.btn}>
            <SortDrawer sortOptions={plantsSortOptions} />
          </div>
          <div className={styles.btn}>
            <FilterDrawer filterOptions={plantsFilterOptions} />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <Products products={products} />
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(filterProducts.length / 12)}
          itemsPerPage={12}
        />
      </div>
    </>
  );
};

export default Shop;
