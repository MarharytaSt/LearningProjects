function validateEmployee(employee) {
    const { firstName, lastName, salary } = employee;

    if (firstName === '' || lastName === '') {
        return {
            isValid: false,
            errorMessage: 'Заполните текстовые поля!'
        };
    }

    if (!salary || salary < 0) {
        return {
            isValid: false,
            errorMessage: 'Заполните числовое поле!'
        };
    }

    return {
        isValid: true,
        errorMessage: ''
    };
}

const validationFunctions = {
    validateEmployee
}

export default validationFunctions;