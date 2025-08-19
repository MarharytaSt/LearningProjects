import { Component } from 'react';
import EmployeesAddForm from '../employees-add-form/employees-add-form.js';
import EmployeesBase from '../employees-base/employess-base.js';
import './app.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <EmployeesBase/>
                <EmployeesAddForm />
            </div>
        );
    }
}

export default App;