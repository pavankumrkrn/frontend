import { apiUrls } from "../../Config/apiurls"
import { LoginRequestBody, SignUpRequestBody } from "../../Interfaces/interfaces"
import authAxiosInstance from "../AxiosInstance/authaxiosIntance"

export const login = async ({username, password} : LoginRequestBody) => {
    const response = await authAxiosInstance.post(apiUrls.login, {username, password})
    return response;
    
}

export const signup = async ({username, email, password} : SignUpRequestBody) => {
    const response = await authAxiosInstance.post(apiUrls.signup, {username, email, password})
    return response;
}

export const check = async () => {
    const response = await authAxiosInstance.get(apiUrls.check);
    return response
}

export const logout = async () => {
    const response = await authAxiosInstance.post(apiUrls.logout);
    return response;
}