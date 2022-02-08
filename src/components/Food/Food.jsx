import styles from "./Food.module.scss";
import apple from "../../apple.png";

export default function Food({ color }) {
  return (
    <div style={{ backgroundColor: color }} className={styles.food}>
      <img src={apple} alt="apple" width={35} height={35} />
    </div>
  );
}
