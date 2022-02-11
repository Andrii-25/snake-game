import appleRed from "../../images/appleRed.png";
import appleGreen from "../../images/appleGreen.png";
import appleYellow from "../../images/appleYellow.png";
import spaceKey from "../../images/spaceKey.png";
import escKey from "../../images/escKey.png";
import styles from "./InfoBoard.module.scss";

export default function InfoBoard() {
  return (
    <div className={styles.container}>
      <h1>Info</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.td}>
              <h2>
                <img
                  src={appleGreen}
                  alt="Green apple"
                  width={25}
                  height={25}
                />
              </h2>
            </td>
            <td className={styles.td}>
              <h2>-</h2>
            </td>
            <td className={styles.td}>
              <h2>1 point</h2>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <h2>
                <img
                  src={appleYellow}
                  alt="Yellow apple"
                  width={25}
                  height={25}
                />
              </h2>
            </td>
            <td className={styles.td}>
              <h2>-</h2>
            </td>
            <td className={styles.td}>
              <h2>5 points</h2>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <h2>
                <img src={appleRed} alt="Red apple" width={25} height={25} />
              </h2>
            </td>
            <td className={styles.td}>
              <h2>-</h2>
            </td>
            <td className={styles.td}>
              <h2>10 points</h2>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <h2>
                <img src={spaceKey} alt="Space key" width={50} height={35} />
              </h2>
            </td>
            <td className={styles.td}>
              <h2>-</h2>
            </td>
            <td className={styles.td}>
              <h2>set pause</h2>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <h2>
                <img src={escKey} alt="Esc key" width={50} height={35} />
              </h2>
            </td>
            <td className={styles.td}>
              <h2>-</h2>
            </td>
            <td className={styles.td}>
              <h2>unset pause</h2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
