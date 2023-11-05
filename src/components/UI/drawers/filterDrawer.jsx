import { useState } from "react";
import { useRouter } from "next/router";

import { TbFilter } from "react-icons/tb/index";
import { VscChromeClose } from "react-icons/vsc/index";
import Drawer from "@mui/material/Drawer";

import { DropdownMenu } from "@/components";

import styles from "./filterDrawer.module.scss";
import { useGetQueries } from "@/hooks";

export const FilterDrawer = ({ filterOptions }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [queries, _, queriesStr] = useGetQueries();

  const onClearAll = () => {
    router.push({ search: queriesStr });
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={styles.drawerBtn}>
        <TbFilter className={styles.icon} />
        <span className={styles.buttonText}>Filters</span>
      </button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className={styles.container}>
          <div className={styles.drawerHeader}>
            <div className={styles.title}>Filter By</div>

            <VscChromeClose
              className={styles.icon}
              onClick={() => setOpen(false)}
            />
          </div>
          <div className={styles.filters}>
            {!!queries.length && (
              <h5 className={styles.clear} onClick={onClearAll}>
                Clear All
              </h5>
            )}
            {filterOptions.map((option) => (
              <DropdownMenu key={option.id} item={option} />
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};
