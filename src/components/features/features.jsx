import { mainFeatures, subFeatures } from "../../data";
import { MainFeatureItem, SubFeatureItem, Subcribe } from "./../../components";

import styles from "./features.module.scss";

export const Features = () => {
  return (
    <>
      <div className={styles.mainFeaturesContainer}>
        {mainFeatures.map((f) => (
          <MainFeatureItem key={f.id} mainFeature={f} />
        ))}
      </div>
      <div className={styles.subFeaturesContainer}>
        {subFeatures.map((f) => (
          <SubFeatureItem key={f.id} subFeature={f} />
        ))}
      </div>
      <Subcribe />
    </>
  );
};
