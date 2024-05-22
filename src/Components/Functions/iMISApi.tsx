import axios, { AxiosResponse } from "axios";
import { Token } from "../Interfaces";
import config from "../../Config/config";

export const generateToken = async (): Promise<Token> => {

    const username = config.developmentUsername;
    const password = config.developmentPassword;
    const devUrl = config.developmentUri;

    const url = `${devUrl}/token`;

    if (!username || !password) {
        throw new Error("Username or password is not provided.");
    }

    try {
        let requestData = `grant_type=password&username=${username}&password=${password}`
        const response: AxiosResponse = await axios({
            method: "POST",
            url: url,
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: requestData,
        });

        return response.data;

    } catch (err: any) {
        if (axios.isAxiosError(err)) {
            throw new Error(err.message);
        } else {
            throw new Error("Error");
        }
    }
};

export const query = async (url: string, method: string, body: any | null, token: string): Promise<AxiosResponse> => {

    if (!token) {
        throw new Error("Insufficient permission");
    }

    if (!url) {
        throw new Error("Missing Url")
    }

    try {
        const response: AxiosResponse = await axios({
            method: method,
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: body,
        });

        console.log({query: response});
        return response;

    } catch (err: any) {
        throw new Error(err.message);
    }
};


