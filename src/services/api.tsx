import axios from "axios";

// 01001000/json/

export const api = axios.create({
    baseURL: "https://viacep.com.br/ws"
})