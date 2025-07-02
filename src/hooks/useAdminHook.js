import adminService from "../service/adminProvider.js";

export function useAdminHook() {
    
  const getAllUsers = () => {
    return adminService.getAllUsers();
  };

  const createClient = (newClient) => {
    return adminService.createClient(newClient);
  };

  return { getAllUsers, createClient };
}
