export type ResponseType = {
    data: {
        message: string;
        token?: string;
    }
}
export type AxiosResponseType = {
    response: ResponseType
}