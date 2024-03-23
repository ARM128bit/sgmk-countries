import { baseApi } from "."

export default {
    getAllContries() {
        return baseApi.get('/all')
    }
}