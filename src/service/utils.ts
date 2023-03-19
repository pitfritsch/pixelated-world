import type { AxiosError } from "axios";
import axios from "axios";

export const handleError = (err: Error | AxiosError) => {
  if (axios.isAxiosError(err)) {
    return err.message;
  } else {
    return "Unexpected error";
  }
};
