import { Component } from "react";
import { Link } from "react-router-dom";
import {MainPageRoute} from '../../settings/appRoutes';


class AddReceiptPage extends Component{
    

    render(){
        return(
            <div>
                Add Receipt Page
                <div>
                    <Link to={MainPageRoute}>Go back to Main Page</Link>
                </div>
            </div>
        )
    }
}

export default AddReceiptPage;