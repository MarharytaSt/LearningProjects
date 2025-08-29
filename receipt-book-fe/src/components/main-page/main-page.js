import { Component } from "react";
import { Link } from "react-router-dom";
import {AddReceiptPageRoute} from '../../settings/appRoutes';



class MainPage extends Component{
    

    render(){
        return(
            <div>
                Main Page
                <div>
                    <Link to={AddReceiptPageRoute}>Add Receipt</Link>
                </div>
            </div>
        )
    }
}

export default MainPage;