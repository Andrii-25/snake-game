import { useEffect, useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import styles from "./Scores.module.scss";

function ScoreBoard() {
  const { store } = useContext(Context);

  useEffect(() => {
    store.getAllScores();
    store.getAllUsers();
  }, []);

  const scores = store.scores.map((score) => {
    let username = "";
    for (let user of store.users) {
      if (user.id === score.user) {
        username = user.username;
      }
    }
    return (
      <tr key={score.score}>
        <td className={styles.td}>{username}</td>
        <td className={styles.td}>{score.score}</td>
        <td className={styles.td}>{score.snakeSpeed}</td>
        <td className={styles.td}>{score.snakeLength}</td>
      </tr>
    );
  });

  return (
    <div className={styles.container}>
      <h1>Best scores</h1>
      <table className={styles.table}>
        <tr>
          <th className={styles.th}>Username</th>
          <th className={styles.th}>Score</th>
          <th className={styles.th}>Snake speed</th>
          <th className={styles.th}>Snake length</th>
        </tr>
        {scores}
      </table>
    </div>
  );
}

export default observer(ScoreBoard);
