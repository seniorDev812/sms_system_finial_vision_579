import axios from "axios";
import authService from "./auth.js";

const adminService = {

    getAllUsers: async () => {
        try {
            await authService.setToken();
            let res = await axios.get(authService.url + "/admin/clients");
            if(res.data.message !== "success") throw new error(res.data.message);
            return res;
        } catch (error) {
            console.log("error", error.message);
        }
    },

    createClient: async (newClient) => {
        try {
            await authService.setToken();
            let res = await axios.post(authService.url + "/admin/clients", newClient);
            console.log("createClient-res-->", res);
            return res;
        } catch (error) {
            console.log("error", error.message);
        }
    },
}

export default adminService;