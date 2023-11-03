import { Wrapper } from "../../components";

import styles from "./about.module.scss";

const About = () => {
  return (
    <div className={styles.container}>
      <section className={styles.introduce}>
        <h2>Who we are</h2>
        <p>We are not magicians, just really passionate plant people.</p>
        <p>
          We are a team of horticultural experts, logistical masterminds, design
          geniuses, and lots of dedicated worker bees trying our best to earn
          the smile you wear on seeing the healthy, happy plants you receive.
        </p>
        <p>
          We are a young enthusiastic team of just over 200 people, working
          behind the scenes to invite you into the secret life of plants. To
          nudge you to experiment, make mistakes, play, pause, and disconnect
          from the noise and find your centre
        </p>
        <img src="./images/plants.png" alt="castus-plants" />
      </section>
      <section className={styles.history}>
        <h2>Our history</h2>
        <p>
          Plantme was formed with the idea to help people pause and breathe in
          some peace in their busy city lives. When Siddhant returned back to
          India after finishing his degree in Landscape Architecture at Cal
          Tech, he noticed the disconnect between people and nature and decided
          to start Plantme to build a bridge between the two.
        </p>
        <p>
          Rooted firmly in his family’s century old agri-tech business, Plantme
          sprung up like a new leaf on a spring morning and is today a mighty
          tree that helps other smaller businesses thrive in its shade. We have
          formed a proudly Made in India ecosystem that grows with each passing
          day.
        </p>
      </section>
      <img
        className={styles.decorateImg}
        src="./images/plant-care.png"
        alt=""
      />
      <section className={styles.actions}>
        <div>
          <h2>What we do</h2>
          <p>
            We are here to encourage people to discover beauty, miracles, and
            serendipity in their everyday lives. We are here to make the magic
            of plants accessible to you at your fingertips and safeguard and
            nurture them till they reach you - their forever homes.
          </p>
          <p>
            We make plant parenting simpler, comfortable, less intimidating and
            reassuring through our ideas, knowledge, and understanding. We grow
            our plants with passion, happiness, and utmost care so that when
            they reach you, they spread the same joy in your lives.
          </p>
        </div>
        <div>
          <h2>How we do it</h2>
          <p>
            We are driven by our passion to promote the slower way of life, to
            help you find the small joys that life has to offer. We grow our own
            plants in state-of-the-art polyhouses and greenhouses spread over 18
            acres of land. Our people watch over the plants with expert help and
            guidance from planting to transporting them to your doorstep.
          </p>
          <p>
            We use a science backed approach to grow our plants, adhere to
            sustainable practices to the best of our ability, while growing a
            community of growers and small business owners that grow with us on
            this journey.
          </p>
        </div>
      </section>
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h2>Our mission</h2>
          <p>
            To inspire a world where every plant journey is a personal
            revolution of inner change and growth. Every plant is a catalyst of
            change for people.
          </p>
          <p>
            We facilitate each step and milestone of this journey where people
            experience their own inner lives, and the world, in revolutionary
            new ways - with new understanding, insight, perspectives and
            openness. This unique, personal life transformation is what causes
            ripples of change across the planet, inspiring a quiet revolution
            that helps nature and humans both live their healthy, happy,
            thriving selves.
          </p>
        </div>
        <img src="./images/mission.jpg" alt="" />
      </section>
      <section className={styles.people}>
        <h2>The People Behind The Plants</h2>
        <p>We are a young, energetic, and passionate team of 200.</p>
        <p>
          We have our head office in Pune and nurseries in Talegaon, with
          dispatch centres in Pune and Mumbai. Our team has horti-cultural
          experts, logistical masterminds, design superstars, management
          superheroes, and the best worker bees who ensure that everything moves
          ahead at the right pace.
        </p>
      </section>
    </div>
  );
};

export default About;
