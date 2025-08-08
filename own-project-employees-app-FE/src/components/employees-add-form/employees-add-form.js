import { Component } from "react";

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

    render() {
        const {firstName, lastName, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form">
                    <input type="text" 
                        placeholder="Введите имя"
                        name="firstName"
                        value={firstName}/>
                    <input type="text" 
                        placeholder="Введите фамилию"
                        name="lastName"
                        value={lastName}/>
                    <input type="text" 
                        placeholder="Зарплата"
                        name="salary"
                        value={salary}/>

                    <button type="submit">Добавить</button>
                </form>
                
            </div>
        );
    }
}

export default EmployeesAddForm;