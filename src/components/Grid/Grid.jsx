import { useEffect, useState } from "react";
import Food from "../Food";
import styles from "./Grid.module.scss";

export default function Grid() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [grid, setGrid] = useState([]);

  function getRandomGrid() {
    return {
      row: Math.floor(Math.random() * rows),
      col: Math.floor(Math.random() * cols),
    };
  }

  useEffect(() => {
    const tempGrid = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const food = getRandomGrid();
        const isFood = food.row === row && food.col === col;
        tempGrid.push({
          row,
          col,
          isFood,
        });
      }
    }
    setGrid(tempGrid);
  }, []);

  const gridItems = grid.map((grid) => {
    if (grid.isFood) {
      return (
        <Food key={grid.row.toString() + "-" + grid.col.toString()}></Food>
      );
    } else {
      return (
        <div
          key={grid.row.toString() + "-" + grid.col.toString()}
          className={styles.gridItem}
        ></div>
      );
    }
  });

  return (
    <div className={styles.snakeContainer}>
      <div className={styles.grid}>{gridItems}</div>
    </div>
  );
}
