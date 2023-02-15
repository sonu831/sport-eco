export const endpoints = {
  addUser: `/users`,
  fetchUserById: (id: string) => `/users/${id}`,
  addPlayer: `/players`,
  fetchPlayerById: (id: string) => `/players/${id}`,
  addBatch: `/batches`,
  fetchBatchById: (id: any) => `/batches/${id}`,
};
