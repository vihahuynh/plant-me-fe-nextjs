import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { ordersFilterOptions, ordersSortOptions } from "@/data";

import {
  SearchBar,
  FilterDrawer,
  SortDrawer,
  Pagination,
  InfoBox,
  AdminOrder,
} from "@/components";

import { orderService } from "@/services";

import styles from "./adminOrderHistory.module.scss";

const AdminOrderHistory = () => {
  const [page, setPage] = useState(1);
  const [filterOrders, setFilterOrders] = useState([]);
  const [orders, setOrders] = useState([]);
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
          `${otherQueries}`,
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
          `${queries}`,
          authen?.user?.token
        );
        setOrders(ordersData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, queries]);

  if (!authen.user?.isAdmin)
    <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;
  if (!orders)
    return (
      <InfoBox text="No order found" btnText="Back to home page" url="/" />
    );

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Order history</h2>
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
                <AdminOrder
                  key={order.id}
                  order={order}
                  userId={authen?.user?.id}
                />
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
          <InfoBox text="No order found" btnText="Back to home page" url="/" />
        )}
      </div>
    </div>
  );
};

export default AdminOrderHistory;
