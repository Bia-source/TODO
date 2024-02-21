import axios from "axios";

type CallServiceProps = {
    method: METHOD;
    url?: string;
    body?: ITasksProps;
}

type ITasksProps = {
    id?: string;
    title?: string;
    description?: string;
    complete?: boolean;
}

export enum METHOD {
    POST = "post",
    GET = "get",
    PUT = "put",
    DELETE = "delete"
}

const api = axios.create({
        baseURL: "http://localhost:3001/tarefas/",
        headers: { 'content-type': 'application/json'},
        // proxy: {
        //     protocol: 'https',
        //     host: '192.168.0.16',
        //     port: 3001,
        //     auth: {
        //       username: `${process.env.AUTH_USERNAME_API}`,
        //       password: `${process.env.AUTH_PASSWORD_API}`
        //     }
        //  },
});

export async function callService({ method, url, body }: CallServiceProps){
    const { data } = await api({
        url: url,
        method: method,
        data: body,
    });
    return data;
}

