import { Component } from "react";
import { Link } from "react-router-dom";
import {AddReceiptPageRoute} from '../../settings/appRoutes';
import './main-page.css';



class MainPage extends Component{
    

    render(){
        return(
            <div className="main-page">
                <h1 className="main-title">Мои рецепты</h1>
                <div className="action-section">
                    <Link to={AddReceiptPageRoute} className="add-button">
                    Добавить рецепт
                    </Link>
                </div>
                <div className="recipe-list">
                    <p></p>
                </div>
            </div>
        )
    }
}

export default MainPage;