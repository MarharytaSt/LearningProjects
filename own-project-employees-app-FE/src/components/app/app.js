import { Component } from 'react';
import EmployeesAddForm from '../employees-add-form/employees-add-form.js';
import EmployeesList from '../employees-list/employees-list.js';
import EmployeesInfo from '../employees-info/employees-info.js';
import './app.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <EmployeesInfo/>
                <EmployeesList />
                <EmployeesAddForm />
                
            </div>
        );
    }
}

export default App;