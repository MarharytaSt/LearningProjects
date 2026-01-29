import api from '../services/splitwiseServices';


const splitwiseApi = {
    getAccounts: () => api.getAsync('/accounts'),
    getAccountById: (_id) => api.getAsync(`/accounts/${_id}`),
    createAccount: (data) => api.postAsync('/accounts', data),
    updateAccount: (id, data) => api.putAsync(`/accounts/${id}`, data),
    deleteAccount: (id) => api.deleteAsync(`/accounts/${id}`)
};

export default splitwiseApi;