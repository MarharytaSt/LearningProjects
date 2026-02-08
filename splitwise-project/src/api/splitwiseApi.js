import api from '../services/splitwiseServices';


const splitwiseApi = {
    getAccounts: () => api.getAsync('/accounts'),
    getAccountById: (id) => api.getAsync(`/accounts/${id}`),
    createAccount: (data) => api.postAsync('/accounts', data),
    updateAccount: (id, data) => api.putAsync(`/accounts/${id}`, data),
    deleteAccount: (id) => api.deleteAsync(`/accounts/${id}`),

    addTransaction: (id, data) => api.postAsync(`/accounts/${id}/transactions`, data),
    deleteTransaction: (id, transactionId) => api.deleteAsync(`/accounts/${id}/transactions/${transactionId}`),
    updateTransaction: (id, data) => api.putAsync(`/accounts/${id}/transactions/${data.transactionId}`, data)
};

export default splitwiseApi;