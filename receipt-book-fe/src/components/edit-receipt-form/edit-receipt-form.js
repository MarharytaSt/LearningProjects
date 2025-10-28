import { Component } from "react";
import './edit-receipt-form.css';


class EditReceiptForm extends Component{


    render(){
        const {recipe} = this.props;
        return(
            <div>
                <div className="form-info">
                    <p>Название рецепта: {recipe.name}</p>
                    <p>Время приготовления: {recipe.cookingDuration} минут</p>
                    <p>Краткое описание: {recipe.description.shortDescription}</p>
                </div>
                <div className="form-steps">
                    <p>{recipe.description.steps.map((step, index) => (
                        <div key={index} className="step-block">
                            <p>Шаг {step.stepOrder + 1}</p>
                            <p>{step.stepDescription}</p>
                        </div>
                    ))}</p>
                    <p></p>
                </div>
            </div>
        )
    }
}

export default EditReceiptForm;