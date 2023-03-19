import { reactive } from "vue";
import api from "./api";
import { handleError } from "./utils";

export class Monster {
  state = reactive({ isLoading: false });

  async getRandom() {
    this.state.isLoading = true;
    let svg = "";
    let error = undefined;
    try {
      const { data } = await api.get("/monsters/random");
      svg = data;
    } catch (e) {
      error = handleError(e);
    } finally {
      this.state.isLoading = false;
    }

    return { svg, error };
  }
}
