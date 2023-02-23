export const endpoints = {
  userCreation: `/api/masteruser/usercreation`,
  validateOtp: `/api/user/verifyotp`,
  updateUserProfile: `/api/user/updateuserprofile`,
  uploadUserProfileImage: `/api/user/userprofilepicupload`,
  fetchUserById: `/api/user/getuserdetailbyid`,

  fetchPlayers: `/api/player/listofplayers`,
  addPlayer: `/api/player/addplayerprofile`,
  updatePlayerProfile: `api/player/updateplayerprofile`,
  uploadPlayerProfileImage: `/api/player/playerprofilepicupload`,

  // Previous Endpoints
  fetchPlayerById: (id: string) => `/players/${id}`,
  addBatch: `/batches`,
  fetchBatchById: (id: any) => `/batches/${id}`,
};
