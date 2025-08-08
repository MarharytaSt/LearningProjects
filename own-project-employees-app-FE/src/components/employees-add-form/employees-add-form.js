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

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {firstName, lastName, salary} = this.state;

        if(firstName === '' || lastName === '' || !salary){
            alert('Пожалуйста, заполните поля!');
            return;
        }else if(salary < 0){
            alert('Введите положительное число!');
            return;
        }

        // this.props.onAdd(this.state.firstName, this.state.lastName, this.state.salary);
        // this.setState({
        //     firstName: '',
        //     lastName: '',
        //     salary: ''
        // })
    }

    render() {
        const {firstName, lastName, salary} = this.state;

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form"
                onSubmit={this.onSubmit}>
                    <input type="text" 
                        placeholder="Введите имя"
                        name="firstName"
                        value={firstName}
                        onChange={this.onValueChange}/>
                    <input type="text" 
                        placeholder="Введите фамилию"
                        name="lastName"
                        value={lastName}
                        onChange={this.onValueChange}/>
                    <input type="number" 
                        placeholder="Зарплата"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}/>

                    <button type="submit">Добавить</button>
                </form>
                
            </div>
        );
    }
}

export default EmployeesAddForm;