export const endpoints = {
  userCreation: `/api/masteruser/usercreation`,
  validateOtp: `/api/user/verifyotp`,
  updateUserProfile: `api/user/updateuserprofile`,
  addUser: `/users`,
  fetchUserById: (id: string) => `/users/${id}`,
  addPlayer: `/players`,
  fetchPlayerById: (id: string) => `/players/${id}`,
  addBatch: `/batches`,
  fetchBatchById: (id: any) => `/batches/${id}`,
};
