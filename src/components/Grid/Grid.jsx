import { useState } from "react";
import Food from "../Food";
import Snake from "../Snake";
import useInterval from "../../hooks/useInterval";
import styles from "./Grid.module.scss";
import getRandomColor from "../../utils/getRandomColor";
import useSound from "use-sound";
import getFoodSound from "../../audio/getFood.wav";
import gameOverSound from "../../audio/gameOver.wav";

export default function Grid() {
  const width = 10;
  const height = 10;
  let initialRows = [];
  for (let i = 0; i < height; i++) {
    initialRows.push([]);
    for (let k = 0; k < width; k++) {
      initialRows[i].push({ title: "blank" });
    }
  }

  const [playGetFoodSound] = useSound(getFoodSound);
  const [playGameOverSound] = useSound(gameOverSound);

  const getRandomPosition = () => {
    const position = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
    return position;
  };

  const [rows, setRows] = useState(initialRows);
  const [snake, setSnake] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ]);
  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(getRandomPosition());
  const [delay, setDelay] = useState(200);
  const [initPoints, setInitPoints] = useState(0);
  const [points, setPoints] = useState(0);
  const foodColors = ["yellow", "orange", "red"];
  const [foodColor, setFoodColor] = useState(getRandomColor(foodColors));
  const [isGameOver, setGameOver] = useState(false);

  const changeDirectionWithKeys = (e) => {
    const { keyCode } = e;
    switch (keyCode) {
      case 37:
        setDirection("left");
        break;
      case 38:
        setDirection("top");
        break;
      case 39:
        setDirection("right");
        break;
      case 40:
        setDirection("bottom");
        break;
      default:
        break;
    }
  };

  document.addEventListener("keydown", changeDirectionWithKeys, false);

  function displaySnake() {
    const newRows = initialRows;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = { title: "snake" };
    });
    let points = 0;
    switch (foodColor) {
      case "yellow":
        points = 1;
        break;
      case "orange":
        points = 5;
        break;
      case "red":
        points = 10;
        break;
    }
    newRows[food.x][food.y] = { title: "food", foodColor, points };
    setRows(newRows);
  }

  function moveSnake() {
    const newSnake = [];
    switch (direction) {
      case "right":
        newSnake.push({ x: snake[0].x, y: (snake[0].y + 1) % width });
        break;
      case "left":
        newSnake.push({ x: snake[0].x, y: (snake[0].y - 1 + width) % width });
        break;
      case "top":
        newSnake.push({ x: (snake[0].x - 1 + height) % height, y: snake[0].y });
        break;
      case "bottom":
        newSnake.push({ x: (snake[0].x + 1) % height, y: snake[0].y });
        break;
    }
    snake.forEach((cell) => {
      newSnake.push(cell);
    });
    if (snake[0].x === food.x && snake[0].y === food.y) {
      playGetFoodSound();
      setPoints(points + rows[food.x][food.y].points);
      if (points - initPoints >= 50) {
        setDelay(Math.floor(delay / 1.1));
        setInitPoints(points);
      }
      setFoodColor(getRandomColor(foodColors));
      setFood(getRandomPosition());
    } else {
      newSnake.pop();
    }

    let count = 0;
    for (let e of snake) {
      if (count === 0) {
        count++;
        continue;
      }
      if (snake[0].x === e.x && snake[0].y === e.y) {
        playGameOverSound();
        setGameOver(true);
      }
      count++;
    }

    setSnake(newSnake);
    displaySnake();
  }

  useInterval(moveSnake, delay);

  const displayRows = rows.map((row) =>
    row.map((e) => {
      switch (e.title) {
        case "blank":
          return <div className={styles.gridItem}></div>;
        case "snake":
          return <Snake />;
        case "food":
          return <Food color={e.foodColor} />;
      }
    })
  );

  return (
    <div className={styles.snakeContainer}>
      <div className={styles.grid}>
        {!isGameOver ? displayRows : "Game Over!"}
      </div>
    </div>
  );
}
