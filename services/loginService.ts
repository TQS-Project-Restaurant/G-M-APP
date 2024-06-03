import client from "./client";

export interface LoginStruct{
    email:string,
    password:string,
}

const loginService = {
    async login(data:LoginStruct){
        return await client.post("/authentication",data)
    },
}

export default loginService;