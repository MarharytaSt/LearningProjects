import { Component } from "react";
import { Link } from "react-router-dom";
import {MainPageRoute} from '../../settings/appRoutes';
import AddReceiptPageHeader from '../header/header';
import AddReceiptForm from '../add-receipt-form/add-receipt-form';
import './add-receipt-page.css';


class AddReceiptPage extends Component{
    

    render(){
        return(
            <div className="add-receipt-page">
                <AddReceiptPageHeader header="Добавление нового рецепта"/>
                <div className="form-wrapper">
                    <AddReceiptForm/>
                </div>
                <div className="back-link">
                    <Link to={MainPageRoute} className="link-button">
                    Вернуться на главную
                    </Link>
                </div>
            </div>
        )
    }
}

export default AddReceiptPage;