import { Component } from 'react';
import './employees-filter.css';
import {PromotionFilter, MoreThan1000Filter} from "../../settings/filters";

class EmployeesFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ''
        };
    }

    onFilterSelected = (filterName) => {
        this.props.onFilterSelect(filterName);
        this.setState({filter: filterName});
    }

    render() {
        const buttonsData = [
            { name: '', label: 'Все сотрудники' },
            { name: MoreThan1000Filter, label: 'З/П больше 1000$' },
            {name: PromotionFilter, label: 'На повышение'}
        ];

        const {filter} = this.state;

        const buttons = buttonsData.map(({ name, label }, index) => {
            const active = filter === name;
            const clazz = active ? 'btn-light' : 'btn-outline-light';
            return (
                <button type="button"
                    className={`btn ${clazz}`}
                    key={index}
                    onClick={() => this.onFilterSelected(name)}>
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