import { Component } from "react";



class AddReceiptPageHeader extends Component {
    render() {

        const { header } = this.props;
        return (
            <div>
                <div className="header">
                    <h2>{header}</h2>
                </div>
            </div>
        )
    }
}


export default AddReceiptPageHeader;