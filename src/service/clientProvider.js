import axios from "axios";
import authService from "./auth.js";

const clientService = {
  //SMS Management
  sendQuickSms: async (payload) => {
    try {
      await authService.setToken();
      const res = await axios.post(authService.url + "/sms/quick", payload);
      if (res.data.message !== "success") throw new error(res.data.message);
      console.log("res-->sms:", res);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  sendBulkSms: async (payload) => {
    try {
      await authService.setToken();
      const res = await axios.post(authService.url + "/sms/bulk", payload);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res.data;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  smsFileUpload: async (formData) => {
    try {
      await authService.setToken();
      const res = await axios.post(authService.url + "/sms/file", formData);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },
  //Group Management
  getGroups: async () => {
    try {
      await authService.setToken();
      const res = await axios.get(authService.url + "/groups");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  deleteOneGroup: async (id) => {
    try {
      await authService.setToken();
      const res = await axios.delete(authService.url + `/groups/${id}`);
      if (res.data.message !== "success") throw new Error(res.data.message);
      return res.data;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  createGroup: async (newGroup, options) => {
    try {
      await authService.setToken();
      if (options.isCSV == true) {
        const res = await axios.post(
          authService.url + "/groups/upload-csv",
          newGroup
        );
        if (res.data.message !== "success") throw new error(res.data.message);
        return res;
      }
      const res = await axios.post(authService.url + "/groups", newGroup);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  getTemplates: async () => {
    try {
      await authService.setToken();
      const res = await axios.get(authService.url + "/templates");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  createNewTemplage: async (newTemplate) => {
    try {
      await authService.setToken();
      const res = await axios.post(authService.url + "/templates", newTemplate);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  updateTemplate: async (newData, id) => {
    try {
      await authService.setToken();
      const res = await axios.put(
        authService.url + `/templates/${id}`,
        newData
      );
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  deleteOneTemplate: async (id) => {
    try {
      await authService.setToken();
      const res = await axios.delete(authService.url + `/templates/${id}`);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  getSenderIds: async () => {
    try {
      await authService.setToken();
      const res = await axios.get(authService.url + "/sender-ids");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  createSenderIdRequest: async (newSenderId) => {
    try {
      await authService.setToken();
      const res = await axios.post(
        authService.url + "/sender-ids",
        newSenderId
      );
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  //Campaign Management
  getCampaigns: async () => {
    try {
      await authService.setToken();
      const res = await axios.get(authService.url + "/campaigns");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  createCampaign: async (newCampaign) => {
    try {
      await authService.setToken();
      const res = await axios.post(authService.url + "/campaigns", newCampaign);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  updateCampaign: async (id, data) => {
    try {
      await authService.setToken();
      const res = await axios.put(authService.url + `/campaigns/${id}`, data);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res.data;
    } catch (error) {
      console.error("Error updating campaign:", error);
      throw error;
    }
  },

  deleteCampaign: async (id) => {
    try {
      await authService.setToken();
      const res = await axios.delete(authService.url + `/campaigns/${id}`);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res.data;
    } catch (error) {
      console.error("Error deleting campaign:", error);
      throw error;
    }
  },

  pauseCampaign: async (id) => {
    try {
      await authService.setToken();
      const res = await axios.patch(authService.url + `/campaigns/${id}/pause`);
      return res.data;
    } catch (error) {
      console.error("Error pausing campaign:", error);
      throw error;
    }
  },

  resumeCampaign: async (id) => {
    try {
      await authService.setToken();
      const res = await axios.patch(
        authService.url + `/campaigns/${id}/resume`
      );
      return res.data;
    } catch (error) {
      console.error("Error resuming campaign:", error);
      throw error;
    }
  },
  //Queued Messages
  getMessages: async () => {
    try {
      await authService.setToken();
      const res = await axios.get(authService.url + "/queue");
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  retryMessage: async (id) => {
    try {
      await authService.setToken();
      const res = await axios.post(authService.url + `/queue/${id}`);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  removeMessage: async (id) => {
    try {
      await authService.setToken();
      const res = await axios.delete(authService.url + `/queue/${id}`);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  getReports: async (params) => {
    try {
      await authService.setToken();
      const res = await axios.get(authService.url + "/reports", { params });
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  updateProfile: async (updateData) => {
    try {
      await authService.setToken();
      const res = await axios.put(authService.url + "/account/profile", updateData);
      if (res.data.message !== "success") throw new error(res.data.message);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },

  updatePassword: async (updateData) => {
    try {
      await authService.setToken();
      const res = await axios.put(authService.url + "/account/password", updateData);
      if (res.data.message !== "success") throw new error(res.data.message);
      console.log("res-password->", res.data);
      return res;
    } catch (error) {
      console.log("error", error.message);
    }
  },
};

export default clientService;
