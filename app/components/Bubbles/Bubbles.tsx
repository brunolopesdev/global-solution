import Image from "next/image";
import styles from "./bubbles.module.scss";

import bottle from "../../../public/water-bottle.svg";
import fish from "../../../public/dead-fish.png";

const Bubbles = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Image src={bottle} alt="bottle" width={50} height={50} />
      </div>
      <div>
        <Image src={fish} alt="fish" width={50} height={50} />
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <Image src={bottle} alt="bottle" width={50} height={50} />
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      <div>
        <span className={styles.dot}></span>
      </div>
      
    </div>
  );
};

export default Bubbles;