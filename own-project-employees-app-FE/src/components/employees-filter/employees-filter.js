import { Component } from 'react';
import './employees-filter.css';

class EmployeesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ''
        };
    }

    onFitlerSelected = (filterName) => {
        this.props.onFilterSelect(filterName);
        this.setState({filter: filterName});
    }

    render() {
        const buttonsData = [
            { name: '', label: 'Все сотрудники' },
            { name: 'moreThen1000', label: 'З/П больше 1000$' }
        ];

        const {filter} = this.state;

        const buttons = buttonsData.map(({ name, label }, index) => {
            const active = filter === name;
            const clazz = active ? 'btn-light' : 'btn-outline-light';
            return (
                <button type="button"
                    className={`btn ${clazz}`}
                    key={index}
                    onClick={() => this.onFitlerSelected(name)}>
                    {label}
                </button>
            )
        })

        return (
            <div className='btn-group'>
                {buttons}
            </div>
        )
    }
}

export default EmployeesFilter;