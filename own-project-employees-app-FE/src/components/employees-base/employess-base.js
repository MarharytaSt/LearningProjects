import { Component } from "react";
import EmployeesInfo from '../employees-info/employees-info';
import EmployeesList from '../employees-list/employees-list';
import { EmployeeChanged } from "../../settings/events";
import eventService from "../../services/eventService";
import apiService from '../../services/apiService';
import { EmployeesEndpoint } from '../../settings/apiSettings';
import SearchPanel from '../search-panel/search-panel';
import EmployeesFilter from "../employees-filter/employees-filter";
import EmployeesModal from "../employees-modal/employees-modal";



class EmployeesBase extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employeesCount: 0,
            term: '',
            selectedEmployees: null,
            isModalOpen: false
        };
    }

    async componentDidMount() {
        await this.fetchEmployees();
        eventService.on(EmployeeChanged, this.fetchEmployees);
    }

    componentWillUnmount() {
        eventService.off(EmployeeChanged, this.fetchEmployees);
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

    handleEdit = (employee) => {
        this.setState({
            selectedEmployees: employee,
            isModalOpen: true
        });
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false, selectedEmployees: null });
    };

    editEmployee = async (id, updatedEmployee) => {
        const response = await apiService.putAsync(`${EmployeesEndpoint}/${id}`, updatedEmployee);

        if (!response || response.statusCode === 500) {
            alert('Что-то пошло не так...');

            return;
        }

        if (response.statusCode === 400) {
            alert('Ошибка валидации на сервере.');

            return;
        }

        this.setState({
            isModalOpen: false,
            selectedEmployees: null
        });

        alert('Пользователь изменен.');

        await this.fetchEmployees();
    }


    render() {
        const { employees, employeesCount, term, filter, selectedEmployees, isModalOpen } = this.state;
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
                <EmployeesList
                    employees={filteredEmployees}
                    onEdit={this.handleEdit} />
                {isModalOpen && selectedEmployees && (
                    <EmployeesModal
                        employee={selectedEmployees}
                        onClose={this.handleCloseModal}
                        onSave={this.editEmployee} />
                )}
            </>
        );
    }
}

export default EmployeesBase;