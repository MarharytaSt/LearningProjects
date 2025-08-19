import { Component } from 'react';
import EmployeesAddForm from '../employees-add-form/employees-add-form.js';
import EmployeesList from '../employees-list/employees-list.js';
import './app.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <EmployeesAddForm />
                <EmployeesList />
            </div>
        );
    }
}

export default App;