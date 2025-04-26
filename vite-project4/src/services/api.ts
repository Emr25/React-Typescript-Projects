import axios from "axios"
import { User } from "../types/user"



const API = "https://jsonplaceholder.typicode.com/users"

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API);
    return response.data;
};