import axios from "axios"

export const getPhotos = async (itemStart: number, limit: number) => {
   const request = await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${itemStart}&_limit=${limit}`);
   return request;
} 