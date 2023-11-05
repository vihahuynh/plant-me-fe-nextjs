import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./pagination.module.scss";
import {
  MdOutlineNavigateNext,
  MdOutlineNavigateBefore,
  MdOutlineLastPage,
  MdOutlineFirstPage,
} from "react-icons/md";
import { useGetQueries } from "@/hooks";

export const Pagination = ({
  page,
  setPage,
  totalPages,
  itemsPerPage,
  theme = "primary",
}) => {
  const [queries, otherQueries] = useGetQueries();
  const router = useRouter();

  const { limit, skip } = queries;

  const curPage = +skip / +limit + 1;

  useEffect(() => {
    if (curPage !== page) {
      setPage(curPage);
    }
  }, [curPage, page, setPage]);

  useEffect(() => {
    if (!queries.skip && !queries.limit) {
      router.push({
        search: `skip=${(page - 1) * itemsPerPage}&limit=${itemsPerPage}${
          otherQueries ? `&${otherQueries}` : ""
        }`,
      });
    }
  }, [queries, itemsPerPage, page, otherQueries]);

  const onNext = () => {
    setPage((curPage) => {
      const newPage = curPage + 1 >= totalPages ? totalPages : curPage + 1;
      router.push({
        search: `skip=${(newPage - 1) * itemsPerPage}&limit=${itemsPerPage}${
          otherQueries ? `&${otherQueries}` : ""
        }`,
      });
      return newPage;
    });
  };

  const onPrevious = () => {
    setPage((curPage) => {
      const newPage = curPage === 1 ? 1 : curPage - 1;
      router.push({
        search: `skip=${(newPage - 1) * itemsPerPage}&limit=${itemsPerPage}${
          otherQueries ? `&${otherQueries}` : ""
        }`,
      });
      return newPage;
    });
  };

  const onFirst = () =>
    router.push({
      search: `skip=0&limit=${itemsPerPage}${
        otherQueries ? `&${otherQueries}` : ""
      }`,
    });
  const onLast = () =>
    router.push({
      search: `skip=${(totalPages - 1) * itemsPerPage}&limit=${itemsPerPage}${
        otherQueries ? `&${otherQueries}` : ""
      }`,
    });

  const onSelectPage = (value) => {
    setPage(value);
    router.push({
      search: `skip=${(value - 1) * itemsPerPage}&limit=${itemsPerPage}${
        otherQueries ? `&${otherQueries}` : ""
      }`,
    });
  };

  const showPages = () => {
    let start = page - 2 > 0 ? page - 2 : 1;
    let end = start + 4 < totalPages ? start + 4 : totalPages;
    if (totalPages >= 5 && end - start < 5) {
      start = end - 4;
    }
    if (totalPages < 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    return Array.from({ length: 5 }, (_, i) => i + start);
  };

  const pages = showPages();

  if (totalPages <= 1) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.pagesContainer}>
        <MdOutlineFirstPage
          className={
            page === 1 ? `${styles.navIcon} ${styles.disabled}` : styles.navIcon
          }
          onClick={onFirst}
        />
        <MdOutlineNavigateBefore
          className={
            page === 1 ? `${styles.navIcon} ${styles.disabled}` : styles.navIcon
          }
          onClick={onPrevious}
        />
        <ul className={styles.pages}>
          {pages.map((i) => (
            <li
              key={i}
              className={i === page ? styles.current : styles[theme]}
              onClick={(e) => onSelectPage(+e.target.innerText)}>
              {i}
            </li>
          ))}
        </ul>
        <MdOutlineNavigateNext
          className={
            page === totalPages
              ? `${styles.navIcon} ${styles.disabled}`
              : styles.navIcon
          }
          onClick={onNext}
        />
        <MdOutlineLastPage
          className={
            page === totalPages
              ? `${styles.navIcon} ${styles.disabled}`
              : styles.navIcon
          }
          onClick={onLast}
        />
      </div>
    </div>
  );
};
