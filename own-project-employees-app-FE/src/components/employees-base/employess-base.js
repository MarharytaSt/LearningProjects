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
import {PromotionFilter, MoreThan1000Filter} from "../../settings/filters";




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

    handleTogglePromotion = async (id) => {
        try {
            const {_id, ...employee} = this.state.employees.find(e => e._id === id);

            if (!employee) return;
 
            const updated = { ...employee, promotion: !employee.promotion };
            const result = await apiService.putAsync(`${EmployeesEndpoint}/${id}`, updated);

            if (!result || result.statusCode !== 200) {
                console.error('Toggle PUT failed', result);
                return;
            }

            await this.fetchEmployees();
        } catch (err) {
            console.error('Error toggling promotion', err);
        }
    }


    filterPost = (items, filter) => {
        switch (filter) {
            case PromotionFilter:
                return items.filter(item => item.promotion);
            case MoreThan1000Filter:
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }


    render() {
        const { 
            employees, 
            employeesCount, 
            term, 
            filter, 
            selectedEmployees, 
            isModalOpen } = this.state;
        let filteredEmployees = this.filterPost(employees, filter);

        if (term) {
            filteredEmployees = filteredEmployees.filter(item => item.firstName.toLowerCase().startsWith(term.toLowerCase()));
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
                    onEdit={this.handleEdit}
                    onTogglePromotion={this.handleTogglePromotion} />
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