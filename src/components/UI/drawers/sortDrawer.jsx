import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";

import styles from "./sortDrawer.module.scss";
import { VscChromeClose } from "react-icons/vsc/index";
import { TbArrowsSort } from "react-icons/tb/index";
import { useRouter } from "next/router";

export const SortDrawer = ({ sortOptions }) => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(null);
  const router = useRouter();
  const queries = window.location.search.slice(1).split("&");

  useEffect(() => {
    const curSort = queries.find((q) => q.includes("sortBy"));
    setSort(curSort);
  }, [queries]);

  const onAddFilters = (query) => {
    let newQueries = [...queries];
    newQueries = newQueries.filter((f) => !f.includes("sortBy"));
    newQueries = newQueries.concat(query);
    newQueries = newQueries.filter((f) => f !== "");
    router.push({
      search: `?${newQueries.join("&")}`,
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
