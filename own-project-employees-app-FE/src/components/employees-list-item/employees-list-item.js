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
        const { employee, onEdit, onTogglePromotion } = this.props;
        const { firstName, lastName, salary, promotion } = employee;

        return (
            <li className='list-group-item d-flex justify-content-between'>

                <span className={promotion ? "text-warning fw-bold me-2" : "me-2"}>{firstName}</span>
                <span className={promotion ? "text-warning fw-bold" : ""}>{lastName}</span>
                <span className='list-group-item-label text-success'>{salary}$</span>

                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className='btn btn-sm btn-outline-primary me-1'
                        onClick={() => onEdit(employee)}>
                        <i className='fas fa-pen'></i>
                    </button>
                    <button type="button"
                        className='btn btn-sm btn-outline-danger me-1'
                        onClick={this.deleteEmployee}>
                        <i className='fas fa-trash'></i>
                    </button>
                    <button type="button"
                        className={`btn btn-sm ${promotion ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => onTogglePromotion(employee._id)}>
                        <i className='fas fa-star'></i>
                    </button>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;

