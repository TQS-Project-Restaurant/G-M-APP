import client from "./client";

export interface loginStruct{
    email:string,
    password:string,
}

const loginService = {
    async login(data:loginStruct){
        return await client.post("/authentication",data)
    },
}

export default loginService;