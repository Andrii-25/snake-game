import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Food from "../Food";
import Snake from "../Snake";
import useInterval from "../../hooks/useInterval";
import styles from "./GameField.module.scss";
import useSound from "use-sound";
import getFoodSound from "../../audio/getFood.wav";
import gameOverSound from "../../audio/gameOver.wav";
import appleRed from "../../images/appleRed.png";
import appleGreen from "../../images/appleGreen.png";
import appleYellow from "../../images/appleYellow.png";
import getRandomValueFromArray from "../../utils/getRandomValueFromArray";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

function GameField() {
  const { store } = useContext(Context);

  const [playGetFoodSound] = useSound(getFoodSound);
  const [playGameOverSound] = useSound(gameOverSound);

  const width = 20;
  const height = 20;
  let initialRows = [];
  for (let i = 0; i < height; i++) {
    initialRows.push([]);
    for (let k = 0; k < width; k++) {
      initialRows[i].push({ title: "blank" });
    }
  }

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

  const foodArray = [
    {
      position: getRandomPosition(),
      points: 1,
      img: appleGreen,
    },
    {
      position: getRandomPosition(),
      points: 5,
      img: appleYellow,
    },
    {
      position: getRandomPosition(),
      points: 10,
      img: appleRed,
    },
  ];

  const [direction, setDirection] = useState("right");
  const [food, setFood] = useState(getRandomValueFromArray(foodArray));
  const [delay, setDelay] = useState(200);
  const [initPoints, setInitPoints] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  const [currentDelay, setCurrentDelay] = useState(delay);

  function restartGame() {
    if (isGameOver) {
      setGameOver(false);
    }
    setDelay(200);
    setRows(initialRows);
    setSnake([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]);
  }

  store.setRestartGame(restartGame);

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
      case 32:
        setPause(99999999999999);
        break;
      case 27:
        unsetPause(currentDelay);
        break;
      default:
        break;
    }
  };

  function setPause(delay) {
    setDelay(delay);
    store.setPaused(true);
  }

  function unsetPause(delay) {
    setDelay(delay);
    store.setPaused(false);
  }

  document.addEventListener("keydown", changeDirectionWithKeys, false);

  function displaySnake() {
    const newRows = initialRows;
    snake.forEach((cell) => {
      newRows[cell.x][cell.y] = { title: "snake" };
    });
    newRows[food.position.x][food.position.y] = {
      title: "food",
      points: food.points,
      image: food.img,
    };
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
    if (snake[0].x === food.position.x && snake[0].y === food.position.y) {
      playGetFoodSound();
      store.setSnakeLength(++store.snakeLength);
      store.setCurrentScore(
        store.currentScore + rows[food.position.x][food.position.y].points
      );
      if (store.currentScore - initPoints >= 50) {
        setDelay(Math.floor(delay / 1.1));
        setCurrentDelay(delay);
        store.setSnakeSpeed(store.snakeSpeed * 1.1);
        setInitPoints(store.currentScore);
      }
      setFood(getRandomValueFromArray(foodArray));
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
        setDelay(99999999999999);
        if (store.score < store.currentScore) {
          store.updateScoreByUserId(store.user.id, {
            score: store.currentScore,
            snakeSpeed: store.snakeSpeed,
            snakeLength: store.snakeLength,
          });
        }
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
          return <div key={uuidv4()} className={styles.gridItem}></div>;
        case "snake":
          return <Snake key={uuidv4()} />;
        case "food":
          return <Food key={uuidv4()} image={e.image} />;
      }
    })
  );

  const gameOverGrid = (
    <div className={styles.grid}>
      <h1 style={{ color: "red" }}>Game Over!</h1>
    </div>
  );

  const gameGrid = <div className={styles.grid}>{displayRows}</div>;

  return <>{isGameOver ? gameOverGrid : gameGrid}</>;
}

export default observer(GameField);
