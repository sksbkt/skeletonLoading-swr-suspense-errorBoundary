import axios from "axios"

// Not needed until optimistic UI updates example
const delay = () => new Promise((res) => setTimeout(() => res(), 1800));

const usersApi = axios.create({
    baseURL: "http://localhost:3500"
})

export const usersUrlEndpoint = '/users'

export async function getUsers() {
    await delay();
    const response = await usersApi.get(usersUrlEndpoint);
    return response.data;
}

export async function getUserById(url, userId) {
    await delay();
    const response = await usersApi.get(`${url}/${userId}`);
    return response.data;
}

