import { Component } from "react";
import { EmployeesEndpoint } from '../../settings/apiSettings';
import apiService from '../../services/apiService';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();

        const { firstName, lastName, salary } = this.state;

        if (firstName === '' || lastName === '') {
            alert('Пожалуйста, заполните поля!');

            return;
        }

        if (!salary || salary < 0) {
            alert('Введите положительное число!');

            return;
        }

        const creationResponse = await apiService.postAsync(EmployeesEndpoint, this.state);

        if (!creationResponse || creationResponse.statusCode === 500) {
            alert('Что-то пошло не так...');

            return;
        } 

        if(creationResponse.statusCode === 400){
            alert('Ошибка валидации на сервере.');
            
            return;
        }

        this.setState({
                firstName: '',
                lastName: '',
                salary: ''
            });

        alert('Пользователь добавлен.');

        return;
    }

    render() {
        const { firstName, lastName, salary } = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form"
                    onSubmit={this.onSubmit}>
                    <input type="text"
                        placeholder="Введите имя"
                        name="firstName"
                        value={firstName}
                        onChange={this.onValueChange} />
                    <input type="text"
                        placeholder="Введите фамилию"
                        name="lastName"
                        value={lastName}
                        onChange={this.onValueChange} />
                    <input type="number"
                        placeholder="Зарплата"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange} />

                    <button type="submit">Добавить</button>
                </form>
            </div>
        );
    }
}

export default EmployeesAddForm;