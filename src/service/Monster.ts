import { reactive } from "vue";
import api from "./api";
import { handleError } from "./utils";

export interface MonsterListing {
  results: MonsterWithId[];
  currentPage: number;
  firstRowOnPage: number;
  rowCountOnLastPage: number;
  lastRowOnPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
}

export interface MonsterWithId {
  id: number;
  svgContent: string;
}

class Monster {
  state = reactive({ isLoading: false, currentPage: 1 });

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

  async getAll(page: number = 1) {
    this.state.isLoading = true;
    try {
      const { data } = await api.get<MonsterListing>("monsters", {
        params: { page },
      });
      this.state.currentPage = data.currentPage;
      return { result: data.results };
    } catch (error) {
      return { error: handleError(error) };
    } finally {
      this.state.isLoading = false;
    }
  }
}

export default Monster;
