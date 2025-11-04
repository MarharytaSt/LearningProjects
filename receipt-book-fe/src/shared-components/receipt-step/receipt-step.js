import { Component } from "react";
import Input from '../../shared-components/input/input';
import ActionsButton from "../actions-button/actions-button";
import './receipt-step.css';



class ReceiptStep extends Component {


    render() {
        const { stepOrder, deleteStep, stepData, setStepData } = this.props;
        return (
            <div className="step">
                <Input
                    name="stepOrder"
                    type="number"
                    placeholder="Порядок шага"
                    value={stepData.stepOrder ?? stepOrder}
                    setFormData={(name, value) => setStepData(stepOrder, name, value)}
                />
                <Input
                    name="stepDescription"
                    type="text"
                    placeholder="Описание шага"
                    value={stepData.stepDescription || ''}
                    setFormData={(name, value) => setStepData(stepOrder, name, value)}
                />
                <ActionsButton
                    btnContent="Удалить"
                    clickHandler={() => deleteStep(stepOrder)} />
            </div>
        )
    }
}

export default ReceiptStep;