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
      <table>
        <tr>
          <th>
            <h2>Best score:</h2>
          </th>
          <th>
            <h2>{store.score}</h2>
          </th>
        </tr>
        <tr>
          <th>
            <h2>Current score:</h2>
          </th>
          <th>
            <h2>{store.currentScore}</h2>
          </th>
        </tr>
        <tr>
          <th>
            <h2>Snake speed:</h2>
          </th>
          <th>
            <h2>{store.snakeSpeed}</h2>
          </th>
        </tr>
      </table>
    </div>
  );
}

export default observer(ScoreBoard);
