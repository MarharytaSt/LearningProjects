import { Component } from 'react';

import EmployeesAddForm from '../employees-add-form/employees-add-form.js';




class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

     addItem = (firstName, lastName, salary) => {
        const newItem = {
            firstName,
            lastName,
            salary
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }




    render() {
        return (
            <div className="App">
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;
