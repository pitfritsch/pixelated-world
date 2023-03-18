import api from "./api";

export class Monster {
  static async getRandom() {
    try {
      const { data } = await api.get("/monsters/random");
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }
}
