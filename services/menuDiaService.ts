import client from "./client";

const menuDiaService = {
    async getMenu(){
       return await client.get("/menu");
    }
}

export default menuDiaService;