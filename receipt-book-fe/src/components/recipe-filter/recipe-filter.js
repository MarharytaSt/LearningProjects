import { Component } from "react";
import './recipe-filter.css';


class RecipeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: '',
            subFilter: ''
        }

    }

    onFilterSelected = (filterName) => {
        this.setState({ filter: filterName, subFilter: '' });
        this.props.onFilterSelect(filterName, '');
    };

    onSubFilterSelected = (subFilterName) => {
        this.setState({ subFilter: subFilterName });
        this.props.onFilterSelect(this.state.filter, subFilterName);
    };

    render() {

        const { filter, subFilter } = this.state;


        const buttonsData = [
            { name: '', label: 'Все рецепты' },
            { name: 'CookingDurationFilter', label: 'Время приготовления' },
            { name: 'StepsFilter', label: 'Количество шагов' },
            {name: 'InFavoritesFilter', label: 'В избранном'}
        ]



        const buttons = buttonsData.map(({ name, label }, index) => {
            const active = filter === name;
            const clas = active ? 'btn-active' : 'btn-nonactive';
            return (
                <button type="button"
                    className={`btn ${clas}`}
                    key={index}
                    onClick={() => this.onFilterSelected(name)}>
                    {label}
                </button>
            )
        })


        return (
            <div className="btn-group">
                <div className="filter-buttons">
                    {buttons}
                </div>
                {filter === 'CookingDurationFilter' && (
                    <div className={`sub-filter ${filter === 'CookingDurationFilter' ? 'visible' : ''}`}>
                        <button
                            className={`btn ${subFilter === 'lessThanHour' ? 'btn-active' : 'btn-nonactive'}`}
                            onClick={() => this.onSubFilterSelected('lessThanHour')}
                        >
                            Меньше часа
                        </button>
                        <button
                            className={`btn ${subFilter === 'moreThanHour' ? 'btn-active' : 'btn-nonactive'}`}
                            onClick={() => this.onSubFilterSelected('moreThanHour')}
                        >
                            Больше часа
                        </button>
                    </div>
                )}
                {filter === 'StepsFilter' && (
                    <div className={`sub-filter visible`}>
                        <button
                            className={`btn ${subFilter === '1step' ? 'btn-active' : 'btn-nonactive'}`}
                            onClick={() => this.onSubFilterSelected('1step')}
                        >
                            1 шаг
                        </button>
                        <button
                            className={`btn ${subFilter === '2step' ? 'btn-active' : 'btn-nonactive'}`}
                            onClick={() => this.onSubFilterSelected('2step')}
                        >
                            2 шага
                        </button>
                        <button
                            className={`btn ${subFilter === '3stepAndMore' ? 'btn-active' : 'btn-nonactive'}`}
                            onClick={() => this.onSubFilterSelected('3stepAndMore')}
                        >
                            3 шага и больше
                        </button>
                    </div>
                )}
                {filter === 'InFavoritesFilter' && (
                    <button
                    onClick={() => this.onFilterSelected('InFavoritesFilter')}
                    >
                        В избранном
                    </button>
                )}
            </div>
        )
    }
}

export default RecipeFilter;


