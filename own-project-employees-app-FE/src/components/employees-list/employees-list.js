import { Component } from "react";
import apiService from '../../services/apiService';
import { EmployeesEndpoint } from '../../settings/apiSettings';
import EmployeesListItem from '../employees-list-item/employees-list-item';
import eventService from "../../services/eventService";
import { EmployeeAdded } from "../../settings/events";

class EmployeesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    async componentDidMount() {
        await this.fetchEmployees();
        eventService.on(EmployeeAdded, this.fetchEmployees);
    }

    componentWillUnmount() {
        eventService.off(EmployeeAdded, this.fetchEmployees);
    }

    fetchEmployees = async () => {
        const employees = await apiService.getAsync(EmployeesEndpoint);

        if (employees) {
            this.setState({ employees: employees });
        }
    }

    render() {
        const { employees } = this.state;
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