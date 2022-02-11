import { useState, useContext } from "react";
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

  const width = 20;
  const height = 20;
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
      store.setCurrentScore(
        store.currentScore + rows[food.position.x][food.position.y].points
      );
      if (store.currentScore - initPoints >= 50) {
        setDelay(Math.floor(delay / 1.1));
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
        store.getScoreByUserId(store.user.id);
        if (store.score < store.currentScore) {
          store.updateScoreByUserId(store.user.id, store.currentScore);
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
          return <div className={styles.gridItem}></div>;
        case "snake":
          return <Snake />;
        case "food":
          return <Food image={e.image} />;
      }
    })
  );

  return (
    <div className={styles.grid}>
      {!isGameOver ? displayRows : "Game Over!"}
    </div>
  );
}

export default observer(GameField);
