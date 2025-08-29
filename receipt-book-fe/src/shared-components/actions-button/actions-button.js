import { Component } from "react";





class ActionsButton extends Component{

    render(){
        const {btnContent, clickHandler} = this.props

        return(
            <div>
                <button
                onClick={clickHandler}>{btnContent}</button>
            </div>
        )
    }
}

export default ActionsButton;