import styles from "./subFeatureItem.module.scss";

export const SubFeatureItem = ({ subFeature }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={subFeature.imageUrl} alt={subFeature.title} />
      </div>
      <div>
        <h5 className={styles.title}>{subFeature.title}</h5>
        <p className={styles.desc}>{subFeature.desc}</p>
      </div>
    </div>
  );
};
