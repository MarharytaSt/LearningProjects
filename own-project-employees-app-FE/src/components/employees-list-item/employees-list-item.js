import { Component } from 'react';
import './employees-list-item.css';

class EmployeesListItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { firstName, lastName, salary } = this.props.employee;

        return (
            <li className='list-group-item d-flex justify-content-between'>

                <span className='list-group-item-label me-3'>{firstName}</span>
                <span className='list-group-item-label me-3'>{lastName}</span>
                <span className='list-group-item-label text-success'>{salary}$</span>

                <div className='d-flex justify-content-center align-items-center'>
                    <button type="button"
                        className='btn btn-sm btn-outline-primary'>
                        <i className='fas fa-pen'></i>
                    </button>
                    <button type="button"
                        className='btn btn-sm btn-outline-danger'>
                        <i className='fas fa-trash'></i>
                    </button>
                </div>
            </li>
        )
    }
}

export default EmployeesListItem;

