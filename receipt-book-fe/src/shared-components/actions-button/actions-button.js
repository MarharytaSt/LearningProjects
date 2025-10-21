import { Component } from "react";
import './actions-button.css';





class ActionsButton extends Component{

    render(){
        const {btnContent, clickHandler, className = ''} = this.props

        return(
            <div>
                <button
                onClick={clickHandler} className={`actions-button ${className}`}>{btnContent}</button>
            </div>
        )
    }
}

export default ActionsButton;