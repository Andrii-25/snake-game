import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import AuthService from "../service/AuthService";
import ScoreService from "../service/ScoreService";
import UserService from "../service/UserService";
import { API_URL } from "../http";
import { message } from "antd";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  score = 0;
  snakeSpeed = 1;
  currentScore = 0;
  snakeLength = 2;
  scores = [];
  users = [];
  isPaused = false;
  restartGame = null;
  isSoundOff = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setScore(score) {
    this.score = score;
  }

  setSnakeSpeed(snakeSpeed) {
    this.snakeSpeed = snakeSpeed;
  }

  setCurrentScore(score) {
    this.currentScore = score;
  }

  setSnakeLength(length) {
    this.snakeLength = length;
  }

  setScores(scores) {
    this.scores = scores;
  }

  setUsers(users) {
    this.users = users;
  }

  setPaused(isPaused) {
    this.isPaused = isPaused;
  }

  setRestartGame(restartGame) {
    runInAction(() => {
      this.restartGame = restartGame;
    });
  }

  setSoundOff(soundOff) {
    this.isSoundOff = soundOff;
  }

  async login(username, password) {
    try {
      const response = await AuthService.login(username, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.getScoreByUserId(this.user.id);
      message.success("Successful login!");
    } catch (e) {
      console.log(e.response?.data?.message);
      message.error(e.response?.data?.message);
    }
  }

  async registration(username, password) {
    try {
      const response = await AuthService.registration(username, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.getScoreByUserId(this.user.id);
      message.success("Successful registration!");
    } catch (e) {
      console.log(e.response?.data?.message);
      message.error(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
      this.setScore(0);
    } catch (e) {
      console.log(e.response?.data?.message);
      message.error(e.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
      message.error(e.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async getScoreByUserId(userId) {
    try {
      const response = await ScoreService.getByUserId(userId);
      this.setScore(response.data.score);
    } catch (e) {
      console.log(e.response?.data?.message);
      message.error(e.response?.data?.message);
    }
  }

  async updateScoreByUserId(userId, score) {
    try {
      const response = await ScoreService.updateByUser(userId, score);
    } catch (e) {
      console.log(e.response?.data?.message);
      message.error(e.response?.data?.message);
    }
  }

  async getAllScores() {
    try {
      const response = await ScoreService.fetchScores();
      this.setScores(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
      message.error(e.response?.data?.message);
    }
  }

  async getAllUsers() {
    try {
      const response = await UserService.fetchUsers();
      this.setUsers(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
      message.error(e.response?.data?.message);
    }
  }
}
