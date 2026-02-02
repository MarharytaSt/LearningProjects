import api from '../services/splitwiseServices';


const splitwiseApi = {
    getAccounts: () => api.getAsync('/accounts'),
    getAccountById: (id) => api.getAsync(`/accounts/${id}`),
    createAccount: (data) => api.postAsync('/accounts', data),
    updateAccount: (id, data) => api.putAsync(`/accounts/${id}`, data),
    deleteAccount: (id) => api.deleteAsync(`/accounts/${id}`)
};

export default splitwiseApi;