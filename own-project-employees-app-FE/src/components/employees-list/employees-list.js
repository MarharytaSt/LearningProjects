import { Component } from "react";
import EmployeesListItem from '../employees-list-item/employees-list-item';


class EmployeesList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { employees } = this.props;
        const elements = employees.map(item =>
            <EmployeesListItem
                key={item._id}
                employee={item} />);

        return (
            <div>
                {elements}
            </div>
        );
    }
}

export default EmployeesList;