import { Component } from 'react';

import './employees-info.css';


class EmployeesInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }


    render() {

        const { employees } = this.state;

        return(
            <div className='employees-info'>
                <h1>Учет сотрудников в компании N</h1>
                <h2>Общее число сотрудников: {employees}</h2>
            </div>
        )
    }
}

export default EmployeesInfo;