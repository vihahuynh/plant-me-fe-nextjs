import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Slider from "react-slick";

import { Arrow, Modal } from "../../components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./imageCarousel.module.scss";

export const ImageCarousel = ({ images }) => {
  const [openModal, setOpenModal] = useState(false);
  const [curImg, setCurImg] = useState("");

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: ".slider-nav",
    nextArrow: <Arrow type="prev" />,
    prevArrow: <Arrow type="next" />,
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "1rem",
    vertical: true,
    arrows: false,
  };

  return (
    <div className={styles.container}>
      <div className={styles["thumbnail-slider-wrap"]}>
        <Slider
          {...settingsThumbs}
          asNavFor={nav1}
          ref={(slider) => setSlider2(slider)}>
          {images.map((img) => (
            <div className={styles["slick-slide"]} key={img}>
              <img
                className={styles["slick-slide-image"]}
                src={img}
                alt="plant"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles["slider-wrapper"]}>
        <Slider
          {...settingsMain}
          asNavFor={nav2}
          ref={(slider) => setSlider1(slider)}>
          {images.map((img) => (
            <div className={styles["slick-img"]} key={img}>
              <img
                className={`${styles["slick-slide-image"]} ${styles.largeImg}`}
                src={img}
                alt="plant"
                onClick={() => {
                  onOpenModal();
                  setCurImg(img);
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
      {typeof window === "object" &&
        ReactDOM.createPortal(
          <Modal
            isOpen={openModal}
            size="full"
            showButtonGroup={false}
            onCancel={onCloseModal}>
            <img className={styles.imageModal} src={curImg} alt="plant" />
            <span className={styles.closeBtn}></span>
          </Modal>,
          document.getElementById("overlay-root")
        )}
    </div>
  );
};
