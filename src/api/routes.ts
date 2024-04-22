import type { EnumApiServices, AxiosResponseList } from "@sgmk-types/index";
import { baseApi } from ".";

export const getAllContries = <T>() => {
  return baseApi.get<T>("/all");
};

export const getCountryByService = <T>(service: EnumApiServices, code: string = "", params: Record<string, string> = {}): Promise<AxiosResponseList<T>> => {
  return baseApi.get(`/${service}/${code}`, params)
}