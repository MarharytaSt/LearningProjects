import { Component } from "react";
import './edit-receipt-page-header.css';


class EditReceiptPageHeader extends Component{

    render() {

        const {header} = this.props;
        return(
            <div>
                <div className="header">
                    <h2>{header}</h2>
                </div>
            </div>
        )
    }
}


export default EditReceiptPageHeader;