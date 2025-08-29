import { Component } from "react";
import Input from '../../shared-components/input/input';
import ActionsButton from "../actions-button/actions-button";





class ReceiptStep extends Component {

    packStepData = (propName, propValue) => {
        const { setStepData, stepOrder } = this.props;
        setStepData(stepOrder, propName, propValue);
    }

    render() {
        const { stepOrder, deleteStep } = this.props;
        return (
            <div className="step">
                <Input
                    name="stepOrder"
                    type="number"
                    placeholder="Порядок шага"
                    setFormData={this.packStepData} />
                <Input
                    name="stepDescription"
                    type="text"
                    placeholder="Описание шага"
                    setFormData={this.packStepData} />
                <ActionsButton
                    btnContent="Удалить"
                    clickHandler={() => deleteStep(stepOrder)} />
            </div>
        )
    }
}

export default ReceiptStep;