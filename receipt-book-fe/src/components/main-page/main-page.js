import { Component } from "react";
import { Link } from "react-router-dom";
import { AddReceiptPageRoute } from '../../settings/appRoutes';
import { getReceipts, updateReceiptById } from '../../api/receiptsApi';
import { withRouter } from "../../shared-components/utils/withRouter";
import RecipeFilter from '../recipe-filter/recipe-filter';
import './main-page.css';



class MainPage extends Component {
    state = {
        recipes: [],
        filter: '',
        subFilter: '',
        favorites: [],
        isFavorite: false
    };

    async componentDidMount() {
        try {

            const recipes = await getReceipts();
            const sorted = [...recipes].reverse();
            this.setState({ recipes: sorted });

        } catch (error) {
            console.error("Ошибка загрузки рецептов", error.message);
        }
    }


    formatMinutes = (n) => {

        const lastDigit = n % 10;
        const lastTwoDigit = n % 100;

        if (lastTwoDigit >= 11 && lastDigit <= 14) {
            return `${n} минут`;
        }

        if (lastDigit === 1) {
            return `${n} минута`;
        }

        if (lastDigit >= 2 && lastDigit <= 4) {
            return `${n} минуты`;
        }

        return `${n} минут`;
    };



    onFilterSelect = (filter, subFilter) => {
        this.setState({ filter, subFilter });
    }


    toggleFavorite = async (recipe) => {
        try {
            const updated = {...recipe, isFavorite: !recipe.isFavorite};
            await updateReceiptById(recipe._id, updated);

            this.setState(({recipes}) => ({
                recipes: recipes.map(r => r._id === recipe._id ? updated : r)
            }));
        } catch (error) {
            console.error("Ошибка при обновлении избранного", error);
        }
    };


    render() {

        const { recipes, filter, subFilter } = this.state;



        const filterPost = (items, filter, subFilter) => {
            switch (filter) {
                case 'CookingDurationFilter':
                    if (subFilter === 'lessThanHour') return items.filter(item => item.cookingDuration < 60);
                    if (subFilter === 'moreThanHour') return items.filter(item => item.cookingDuration >= 60);
                    return items;
                case 'StepsFilter':
                    if (subFilter === '1step') return items.filter(item => item.description.steps.length === 1);
                    if (subFilter === '2step') return items.filter(item => item.description.steps.length === 2);
                    if (subFilter === '3stepAndMore') return items.filter(item => item.description.steps.length >= 3);
                    return items;
                case 'InFavoritesFilter':
                    return items.filter(item => item.isFavorite);
                default:
                    return items;
            }
        }


        const filteredRecipes = filterPost(recipes, filter, subFilter);



        return (
            <div className="main-page">
                <h1 className="main-title">Мои рецепты</h1>
                <h2 className="main-info">Общее количество рецептов: {recipes.length}</h2>
                <div className="main-filter">
                    <RecipeFilter onFilterSelect={this.onFilterSelect} />
                </div>
                <div className="action-section">
                    <Link to={AddReceiptPageRoute} className="add-button">
                        Добавить рецепт
                    </Link>
                </div>
                <div className="recipe-list">
                    {filteredRecipes.map((recipe, index) => (
                        <div
                            key={index}
                            className="recipe-card"
                            onClick={() => this.props.router.navigate(`/edit-receipt/${recipe._id}`)}
                            >
                            <i className={recipe.isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    this.toggleFavorite(recipe);
                                }}
                            ></i>
                            <h3 className="recipe-header">{recipe.name}</h3>
                            <p className="recipe-time">Время приготовления: {this.formatMinutes(recipe.cookingDuration)}</p>
                            {
                                recipe.description?.shortDescription
                                && <p className="recipe-descr">{recipe.description.shortDescription}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default withRouter(MainPage);



