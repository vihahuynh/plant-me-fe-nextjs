import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";

import styles from "./sortDrawer.module.scss";
import { VscChromeClose } from "react-icons/vsc/index";
import { TbArrowsSort } from "react-icons/tb/index";
import { useRouter } from "next/router";
import { useGetQueries } from "@/hooks";
import { getQueryString } from "@/utils";

export const SortDrawer = ({ sortOptions }) => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(null);
  const router = useRouter();

  const [queries] = useGetQueries();

  useEffect(() => {
    const curSort = queries.sortBy ? `sortBy=${queries.sortBy}` : "";
    setSort(curSort);
  }, [queries]);

  const onAddFilters = (query) => {
    const newQueries = { ...queries, sortBy: query.split("=")[1] };
    const newQueriesStr = getQueryString(newQueries);
    router.push({
      search: `?${newQueriesStr}`,
    });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={styles.drawerBtn}>
        <TbArrowsSort className={styles.icon} />
        <span className={styles.buttonText}>Sort</span>
      </button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className={styles.container}>
          <div className={styles.drawerHeader}>
            <div className={styles.title}>Sort By</div>
            <VscChromeClose
              className={styles.icon}
              onClick={() => setOpen(false)}
            />
          </div>
          <ul className={styles.list}>
            {sortOptions.map((option) => (
              <li
                className={option.query === sort ? styles.curOption : ""}
                key={option.id}
                onClick={() => {
                  setSort(option.query);
                  setOpen(false);
                  onAddFilters(option.query);
                }}>
                {option.text}
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
    </>
  );
};
