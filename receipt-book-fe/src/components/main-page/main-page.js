import { Component } from "react";
import { Link } from "react-router-dom";
import { AddReceiptPageRoute } from '../../settings/appRoutes';
import { getReceipts } from '../../api/receiptsApi';
import { withRouter } from "../../shared-components/utils/withRouter";
import './main-page.css';



class MainPage extends Component {
    state = {
        recipes: []
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


    render() {
        return (
            <div className="main-page">
                <h1 className="main-title">Мои рецепты</h1>
                <div className="action-section">
                    <Link to={AddReceiptPageRoute} className="add-button">
                        Добавить рецепт
                    </Link>
                </div>
                <div className="recipe-list">
                    {this.state.recipes.map((recipe, index) => (
                        <div key={index} className="recipe-card" onClick={() => this.props.router.navigate(`/edit-receipt/${recipe._id}`)}>
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



