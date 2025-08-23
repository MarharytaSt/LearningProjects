import { Component } from 'react';
import './employees-list-item.css';
import apiService from '../../services/apiService';
import { EmployeesEndpoint } from '../../settings/apiSettings';
import eventService from '../../services/eventService';
import { EmployeeChanged } from '../../settings/events';

class EmployeesListItem extends Component {
    deleteEmployee = async () => {
        const { _id } = this.props.employee;

        await apiService.deleteAsync(`${EmployeesEndpoint}/${_id}`);

        eventService.emit(EmployeeChanged);
    }

    render() {
        const { employee, onEdit } = this.props;
        const { firstName, lastName, salary } = employee;

        return (
            <li className='list-group-item d-flex justify-content-between'>

                <span className='list-group-item-label me-3'>{firstName}</span>
                <span className='list-group-item-label me-3'>{lastName}</span>
                <span className='list-group-item-label text-success'>{salary}$</span>

                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className='btn btn-sm btn-outline-primary'
                        onClick={() => onEdit(employee)}>
                        <i className='fas fa-pen'></i>
                    </button>
                    <button type="button"
                        className='btn btn-sm btn-outline-danger'
                        onClick={this.deleteEmployee}>
                        <i className='fas fa-trash'></i>
                    </button>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;

