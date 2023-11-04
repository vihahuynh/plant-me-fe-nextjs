import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { notificationFilterOptions, notificationSortOptions } from "@/data";

import {
  UserLeftMenu,
  FilterDrawer,
  NotificationItem,
  SortDrawer,
  Pagination,
  InfoBox,
} from "@/components";
import { notificationService } from "@/services";

import styles from "./notificationHistory.module.scss";

const NotificationHistory = () => {
  const authen = useSelector((state) => state.authentication);
  const [page, setPage] = useState(1);
  const [filterNotification, setFilterNotification] = useState([]);
  const [notification, setNotification] = useState([]);
  const queries = "";
  // const queries = window.location.search.slice(1);
  const otherQueries = queries
    .split("&")
    .filter((q) => !q.includes("skip") && !q.includes("limit"))
    .join("&");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const notiData = await notificationService.getAll(
          `show=true&user=${authen?.user?.id}&${otherQueries}`,
          authen?.user?.token
        );
        setFilterNotification(notiData.data);
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
        const notiData = await notificationService.getAll(
          `show=true&user=${authen?.user?.id}&${queries}`,
          authen?.user?.token
        );
        setNotification(notiData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, queries]);

  if (!authen?.user?.id)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;

  return (
    <div className={styles.main}>
      <UserLeftMenu />
      <div className={styles.container}>
        <h2>My notification</h2>
        <div className={styles.btnContainers}>
          <div className={styles.btn}>
            <SortDrawer sortOptions={notificationSortOptions} />
          </div>
          <div className={styles.btn}>
            <FilterDrawer filterOptions={notificationFilterOptions} />
          </div>
        </div>
        {!!notification.length ? (
          <>
            <ul className={styles.notiList}>
              {notification.map((item) => (
                <NotificationItem
                  key={item.id}
                  item={item}
                  userId={authen?.user?.id}
                  setNotification={setNotification}
                />
              ))}
            </ul>
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={Math.ceil(filterNotification.length / 10)}
              itemsPerPage={10}
              theme="white"
            />
          </>
        ) : (
          <p className={styles.infoText}>No notification</p>
        )}
      </div>
    </div>
  );
};

export default NotificationHistory;
