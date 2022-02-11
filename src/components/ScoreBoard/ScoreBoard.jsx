import { useEffect, useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import styles from "./ScoreBoard.module.scss";

function ScoreBoard() {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getScoreByUserId(store.user.id);
  }, []);

  return (
    <div className={styles.container}>
      <h1>{store.user.username}</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.td}>
              <h2>Best score:</h2>
            </td>
            <td className={styles.td}>
              <h2>{store.score}</h2>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <h2>Current score:</h2>
            </td>
            <td className={styles.td}>
              <h2>{store.currentScore}</h2>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <h2>Snake speed:</h2>
            </td>
            <td className={styles.td}>
              <h2>{store.snakeSpeed.toFixed(2)}x</h2>
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <h2>Snake length:</h2>
            </td>
            <td className={styles.td}>
              <h2>{store.snakeLength}</h2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default observer(ScoreBoard);
