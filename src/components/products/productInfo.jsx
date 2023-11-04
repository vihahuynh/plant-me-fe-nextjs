import { CgArrowLongRight } from "react-icons/cg/index";
import { TbSun, TbTree, TbDroplet, TbGrowth } from "react-icons/tb/index";
import { HiOutlineSparkles } from "react-icons/hi";

import { plantNotes } from "@/data";

import { Accordion } from "@/components";

import styles from "./productInfo.module.scss";

export const ProductInfo = ({ product }) => {
  return (
    <div className={styles.container}>
      <Accordion title="Description" active={true}>
        <div className={styles.description}>
          <p className={styles.about}>{product.about}</p>
          {plantNotes.map((note) => (
            <div key={note.id} className={styles.note}>
              <CgArrowLongRight className={styles.icon} />
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      </Accordion>
      <Accordion title="Living Condition">
        <div className={styles.livingConditions}>
          {!!product?.watering && (
            <div className={styles.condition} key="Watering">
              <TbDroplet className={styles.icon} />
              <div>
                <h4 className={styles.h4}>Watering</h4>
                <p>{product.watering}</p>
              </div>
            </div>
          )}
          {!!product?.light && (
            <div className={styles.condition} key="light">
              <TbSun className={styles.icon} />
              <div>
                <h4 className={styles.h4}>Light</h4>
                <p>{product?.light}</p>
              </div>
            </div>
          )}
          {!!product?.idealLocation?.length && (
            <div className={styles.condition} key="ideal-location">
              <TbTree className={styles.icon} />
              <div>
                <h4 className={styles.h4}>Ideal location</h4>
                <p>{product?.idealLocation?.join(", ")}</p>
              </div>
            </div>
          )}
          {!!product?.whereToGrow?.length && (
            <div className={styles.condition} key="where-to-grow">
              <TbGrowth className={styles.icon} />
              <div>
                <h4 className={styles.h4}>Where to grow</h4>
                <p>{product?.whereToGrow?.join(", ")}</p>
              </div>
            </div>
          )}
          {!!product?.specialFeatures?.length && (
            <div className={styles.condition} key="special-features">
              <HiOutlineSparkles className={styles.icon} />
              <div>
                <h4 className={styles.h4}>Special Fetures</h4>
                <p>{product?.specialFeatures?.join(", ")}</p>
              </div>
            </div>
          )}
        </div>
      </Accordion>
      <Accordion title="Plant care">
        <div className={styles.plantCare}>
          {product.plantCare.map((plantCareTip) => (
            <div key={plantCareTip.title} className={styles.plantCareTip}>
              <h4 className={styles.h4}>{plantCareTip.title}: </h4>
              <p>{plantCareTip.content}</p>
            </div>
          ))}
        </div>
      </Accordion>
      <Accordion title="Common Problems">
        <div className={styles.commonProblems}>
          {product.commonProblems.map((problem) => (
            <div key={problem.title} className={styles.problem}>
              <h4 className={styles.h4}>{problem.title}</h4>
              <p>{problem.content}</p>
            </div>
          ))}
        </div>
      </Accordion>
      <Accordion title="Style and Decor">
        <div className={styles.decorTips}>
          {product.decorTips.map((decorTip) => (
            <div key={decorTip.title} className={styles.decorTip}>
              <h4 className={styles.h4}>{decorTip.title}: </h4>
              <p>{decorTip.content}</p>
            </div>
          ))}
        </div>
      </Accordion>
    </div>
  );
};
