import { useEffect, useState } from "react";
import styles from "./Grid.module.scss";

export default function Grid() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const tempGrid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        tempGrid.push({
          row,
          col,
        });
      }
    }
    setGrid(tempGrid);
  }, []);

  const gridItems = grid.map((grid) => {
    return (
      <div
        key={grid.row.toString() + "-" + grid.col.toString()}
        className={styles.gridItem}
      ></div>
    );
  });

  return (
    <div className={styles.snakeContainer}>
      <div className={styles.grid}>{gridItems}</div>
    </div>
  );
}
