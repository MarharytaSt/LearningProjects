import { Component } from "react";
import './employees-modal.css';
import validationFunctions from "../../services/validation";


class EmployeesModal extends Component {
    constructor(props) {
        super(props);
        const { employee } = props;
        this.state = {
            firstName: employee.firstName,
            lastName: employee.lastName,
            salary: employee.salary
        }
    }


    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = () => {
        const validationResult = validationFunctions.validateEmployee(this.state);

        if (!validationResult.isValid) {
            alert(validationResult.errorMessage);

            return;
        }

        const { _id } = this.props.employee;

        this.props.onSave(_id, this.state);
    }

    render() {
        const { onClose } = this.props;
        const { firstName, lastName, salary } = this.state;

        return (
            <div className="modal-backdrop">
                <div className="my-modal">
                    <h2>Редактировать сотрудника</h2>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        placeholder="Имя"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        placeholder="Фамилия"
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="salary"
                        value={salary}
                        placeholder="Зарплата"
                        onChange={this.handleChange}
                    />

                    <div className="modal-actions">
                        <button onClick={this.handleSubmit}>Сохранить</button>
                        <button onClick={onClose}>Отмена</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeesModal;




// editEmployee = async () => {
//     const { _id } = this.props.employee;

//     await apiService.putAsync(`${EmployeesEndpoint}/${_id}`,)

//     eventService.emit(EmployeeChanged);
// }

