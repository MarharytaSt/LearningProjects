import { Component } from "react";
import EmployeesInfo from '../employees-info/employees-info';
import EmployeesList from '../employees-list/employees-list';
import { EmployeeAdded } from "../../settings/events";
import eventService from "../../services/eventService";
import apiService from '../../services/apiService';
import { EmployeesEndpoint } from '../../settings/apiSettings';


class EmployeesBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employeesCount: 0
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
            this.setState({ employees: employees, employeesCount: employees.length });
        }
    }

    render() {
        const { employees, employeesCount } = this.state;

        return (
            <>
                <EmployeesInfo employeesCount={employeesCount} />
                <EmployeesList employees={employees} />
            </>
        );
    }
}

export default EmployeesBase;