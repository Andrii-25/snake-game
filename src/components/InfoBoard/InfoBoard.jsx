import appleRed from "../../images/appleRed.png";
import appleGreen from "../../images/appleGreen.png";
import appleYellow from "../../images/appleYellow.png";
import styles from "./InfoBoard.module.scss";

export default function InfoBoard() {
  return (
    <div className={styles.container}>
      <h1>Info</h1>
      <table>
        <tr>
          <th>
            <h2>
              <img src={appleGreen} alt="Green apple" width={25} height={25} />
            </h2>
          </th>
          <th>
            <h2>-</h2>
          </th>
          <th>
            <h2>1 point</h2>
          </th>
        </tr>
        <tr>
          <th>
            <h2>
              <img
                src={appleYellow}
                alt="Yellow apple"
                width={25}
                height={25}
              />
            </h2>
          </th>
          <th>
            <h2>-</h2>
          </th>
          <th>
            <h2>5 points</h2>
          </th>
        </tr>
        <tr>
          <th>
            <h2>
              <img src={appleRed} alt="Red apple" width={25} height={25} />
            </h2>
          </th>
          <th>
            <h2>-</h2>
          </th>
          <th>
            <h2>10 points</h2>
          </th>
        </tr>
      </table>
    </div>
  );
}
