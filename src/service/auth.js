import axios, { Axios } from "axios";

const authService = {
  url: "http://localhost:4001/api",

  setToken: async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      axios.defaults.headers.common = { Authorization: `Bearer ${jwtToken}` };
    }
  },

  login: async (authData) => {
    try {
      let res = await axios.post(authService.url + "/auth/login", authData);
      if (res.data.message !== "success") throw new Error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },
};

export default authService;
