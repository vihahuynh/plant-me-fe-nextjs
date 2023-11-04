import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { ordersFilterOptions, ordersSortOptions } from "@/data";

import {
  Wrapper,
  UserLeftMenu,
  Order,
  SearchBar,
  FilterDrawer,
  SortDrawer,
  Pagination,
  InfoBox,
  Loading,
} from "@/components";

import { orderService } from "@/services";

import styles from "./orderHistory.module.scss";

const OrderHistory = () => {
  const [page, setPage] = useState(1);
  const [filterOrders, setFilterOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authen = useSelector((state) => state.authentication);
  const queries = "";
  // const queries = history.location.search.slice(1);
  const otherQueries = queries
    .split("&")
    .filter((q) => !q.includes("skip") && !q.includes("limit"))
    .join("&");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const ordersData = await orderService.getAll(
          `user=${authen?.user?.id}&${otherQueries}`,
          authen?.user?.token
        );
        setFilterOrders(ordersData.data);
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
        const ordersData = await orderService.getAll(
          `user=${authen?.user?.id}&${queries}`,
          authen?.user?.token
        );
        setOrders(ordersData.data);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    };
    fetchData();
  }, [authen, queries]);

  if (!authen.user?.id)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;

  if (isLoading) return <Loading />;

  return (
    <div className={styles.main}>
      <UserLeftMenu />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>My Orders</h2>
          <div className={styles.btnContainers}>
            <div className={styles.btn}>
              <SortDrawer sortOptions={ordersSortOptions} />
            </div>
            <div className={styles.btn}>
              <FilterDrawer filterOptions={ordersFilterOptions} />
            </div>
          </div>
        </div>
        {orders.length ? (
          <>
            <SearchBar borderRadius="square" />
            <ul className={styles.ordersList}>
              {orders.map((order) => (
                <Order key={order.id} order={order} userId={authen?.user?.id} />
              ))}
            </ul>
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={Math.ceil(filterOrders.length / 10)}
              itemsPerPage={10}
              theme="white"
            />
          </>
        ) : (
          <p className={styles.infoText}>No order found</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
