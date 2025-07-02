import clientService from "../service/clientProvider.js";

export function useClientHook() {
  //SMS Management
  const sendBulkSms = (payload) => {
    return clientService.sendBulkSms(payload);
  };

  const smsFileUpload = (formData) => {
    return clientService.smsFileUpload(formData);
  };

  const sendQuickSms = (payload) => {
    return clientService.sendQuickSms(payload);
  };
  //Group Management
  const getGroups = () => {
    return clientService.getGroups();
  };

  const deleteOneGroup = (id) => {
    clientService.deleteOneGroup(id);
  };

  const createGroup = (newGroup, upload) => {
    return clientService.createGroup(newGroup, upload);
  };
  //Templage Mangement
  const getTemplates = () => {
    return clientService.getTemplates();
  };

  const createNewTemplage = (newTemplate) => {
    return clientService.createNewTemplage(newTemplate);
  };

  const updateTemplate = (newData, id) => {
    return clientService.updateTemplate(newData, id);
  };

  const deleteOneTemplate = (id) => {
    return clientService.deleteOneTemplate(id);
  };
  //SenderId
  const getSenderIds = () => {
    return clientService.getSenderIds();
  };

  const createSenderIdRequest = (newSenderId) => {
    return clientService.createSenderIdRequest(newSenderId);
  };
  //Campaign Management
  const getCampaigns = () => {
    return clientService.getCampaigns();
  };

  const createCampaign = (newCampaign) => {
    return clientService.createCampaign(newCampaign);
  };

  const updateCampaign = (id, updateDate) => {
    return clientService.updateCampaign(id, updateDate);
  };

  const deleteCampaign = (id) => {
    return clientService.deleteCampaign(id);
  };
  //Queued Message
  const getMessages = () => {
    return clientService.getMessages();
  };

  const retryMessage = (id) => {
    return clientService.retryMessage(id);
  };

  const removeMessage = (id) => {
    return clientService.removeMessage(id);
  };

  const getReports = (params) => {
    return clientService.getReports(params);
  };

  const updateProfile = (updateData) => {
    return clientService.updateProfile(updateData);
  };

  const updatePassword = (updateData) => {
    return clientService.updatePassword(updateData);
  };

  return {
    sendBulkSms,
    smsFileUpload,
    sendQuickSms,
    getGroups,
    deleteOneGroup,
    createGroup,
    getTemplates,
    createNewTemplage,
    updateTemplate,
    deleteOneTemplate,
    getSenderIds,
    createSenderIdRequest,
    getCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getMessages,
    retryMessage,
    removeMessage,
    getReports,
    updateProfile,
    updatePassword,
  };
}
