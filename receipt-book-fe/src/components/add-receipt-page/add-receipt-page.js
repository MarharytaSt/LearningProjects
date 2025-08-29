import { Component } from "react";
import { Link } from "react-router-dom";
import {MainPageRoute} from '../../settings/appRoutes';
import AddReceiptPageHeader from '../header/header';
import AddReceiptForm from '../add-receipt-form/add-receipt-form';


class AddReceiptPage extends Component{
    

    render(){
        return(
            <div>
                <AddReceiptPageHeader header="Добавление нового рецепта"/>
                <AddReceiptForm/>
                <div>
                    <Link to={MainPageRoute}>Go back to Main Page</Link>
                </div>
            </div>
        )
    }
}

export default AddReceiptPage;