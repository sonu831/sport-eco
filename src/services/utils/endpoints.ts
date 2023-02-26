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

  addBatch: `api/batch/addbatch`,
  fetchBatchById: `api/batch/getbatchdatabyid`,
  deleteBatchById: `api/batch/deletebatchbyid`,
  updateBatchDetails: `api/batch/updatebatchdetails`,
  addPlayerInBatch: `api/batch/addplayerinbatch`,
  deletePlayerFromBatch: `api/batch/removeplayerinbatch`,

  // Venues
  listOfVenue: `api/venue/listofvenue`,
  addVenue: `api/venue/addvenuedata`,
  updateVenue: `api/venue/updatevenuedata`,
  deleteVenue: `api/venue/deletevenuebyid`,
};
