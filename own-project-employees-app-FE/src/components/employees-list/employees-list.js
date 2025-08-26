import { Component } from "react";
import EmployeesListItem from '../employees-list-item/employees-list-item';


class EmployeesList extends Component {

    render() {
        const { employees, onEdit, onTogglePromotion } = this.props;
        const elements = employees.map(item =>
            <EmployeesListItem
                key={item._id}
                employee={item}
                onEdit={onEdit}
                onTogglePromotion={onTogglePromotion} />);

        return (
            <div>
                {elements}
            </div>
        );
    }
}

export default EmployeesList;