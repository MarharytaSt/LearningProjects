import { Component } from "react";
import EmployeesInfo from '../employees-info/employees-info';
import EmployeesList from '../employees-list/employees-list';
import { EmployeeAdded } from "../../settings/events";
import eventService from "../../services/eventService";
import apiService from '../../services/apiService';
import { EmployeesEndpoint } from '../../settings/apiSettings';
import SearchPanel from '../search-panel/search-panel';
import EmployeesFilter from "../employees-filter/employees-filter";


class EmployeesBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employeesCount: 0,
            term: ''
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

    onUpdateSearch = (term) => {
        this.setState({ term });
    }

    onFilterSelect = (filter) => {
        this.setState({ filter });
    }

    render() {
        const { employees, employeesCount, term, filter } = this.state;
        let filteredEmployees = employees;

        if (term) {
            filteredEmployees = filteredEmployees.filter(item => item.firstName.startsWith(term));
        }

        if (filter) {
            filteredEmployees = filteredEmployees.filter(item => item.salary > 1000);
        }

        return (
            <>
                <EmployeesInfo employeesCount={employeesCount} />
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch} />
                    <EmployeesFilter onFilterSelect={this.onFilterSelect} />
                </div>
                <EmployeesList employees={filteredEmployees} />
            </>
        );
    }
}

export default EmployeesBase;