import $api from "../http";

export default class ScoreService {
  static createNew(score) {
    return $api.post("/score", { score });
  }

  static fetchScores() {
    return $api.get("/score/all");
  }

  static getByUserId(userId) {
    return $api.get(`/score/${userId}`);
  }

  static updateByUser(userId, score) {
    return $api.put(`/score/${userId}`, { score });
  }
}
