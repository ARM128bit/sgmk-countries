import { baseApi } from "."

export default {
    getAllContries<T>(params = {}) {
        return baseApi.get<T>('/all', params)
    }
}