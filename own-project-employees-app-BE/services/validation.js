function validateEmployee(employee) {
    const { firstName, lastName, salary } = employee;

    if (firstName === '' || lastName === '') {
        return false;
    }

    if (!salary || salary < 0) {
        return false;
    }

    return true;
}

const validationFunctions = {
    validateEmployee
};

export default validationFunctions;