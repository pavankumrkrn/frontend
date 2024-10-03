import { apiUrls } from "../../Config/apiurls"
import { CreateItem } from "../../Interfaces/interfaces";
import itemsAxiosInstance from "../AxiosInstance/itemaxiosinstance"

export const createItem = async ({title, url, thumbnailUrl} :  CreateItem ) => {
   const response = await itemsAxiosInstance.post(apiUrls.createItem, {
    title, url, thumbnailUrl
   });

   return response
}

export const getItems = async () => {
   const response = await itemsAxiosInstance.get(apiUrls.getItems)
   return response
}