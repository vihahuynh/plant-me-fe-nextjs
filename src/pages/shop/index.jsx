import { useState, useEffect } from "react";

import { plantsFilterOptions, plantsSortOptions } from "@/data";

import {
  Products,
  Pagination,
  SortDrawer,
  FilterDrawer,
  Loading,
  InfoBox,
} from "@/components";
import { productService } from "@/services";

import styles from "./shop.module.scss";
import { useGetQueries } from "@/hooks";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [queries, otherQueries, queriesStr] = useGetQueries();

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
        if (queries.skip && queries.limit) {
          const productsData = await productService.getAll(queriesStr);
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
        {filterProducts.length ? (
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={Math.ceil(filterProducts.length / 12)}
            itemsPerPage={12}
          />
        ) : (
          <InfoBox text="No product match the filter, please update the filter" />
        )}
      </div>
    </>
  );
};

export default Shop;
