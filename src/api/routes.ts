import { baseApi } from ".";

export const getAllContries = <T>() => {
  return baseApi.get<T>("/all");
};
