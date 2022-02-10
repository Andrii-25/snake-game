import $api from "../http";

export default class ScoreService {
  static createNew(score) {
    return $api.post("/score", { score });
  }

  static fetchScores() {
    return $api.get("/score/all");
  }

  static getByUser(userId) {
    return $api.get("/score", { userId });
  }

  static updateByUser(userId) {
    return $api.put("/score", { userId });
  }
}
