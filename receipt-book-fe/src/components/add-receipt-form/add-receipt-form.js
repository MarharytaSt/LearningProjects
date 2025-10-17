import { Component } from "react";
import Input from '../../shared-components/input/input';
import ReceiptStep from '../../shared-components/receipt-step/receipt-step';
import ActionsButton from '../../shared-components/actions-button/actions-button';
import {withRouter} from '../../shared-components/utils/withRouter.js';
import { postReceipt } from "../../api/receiptsApi.js";



class AddReceiptForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receipt: {
                steps: []
            },
            stepCount: 1,
            stepComponents: []
        };

        this.generateStepComponents();
        this.props.navigate('/');
    }

    createReceipt = async () => {
        try {
            await postReceipt(this.state.receipt);
            alert('Рецепт успешно сохранен!');
            this.resetForm();
            this.props.navigate('/');
        } catch (error) {
            alert(error.message);
            console.error(error);
        }   
    }


    setFormData = (propName, propValue) => {
        this.setState({
            receipt: {
                ...this.state.receipt,
                [propName]: propValue
            }
        });
    }

    setStepData = (stepIndex, propName, propValue) => {
        const { receipt } = this.state;
 
        if (!receipt.steps[stepIndex]) {
            const stepObj = {
                [propName]: propValue
            };
            receipt.steps.push(stepObj);
        } else {
            receipt.steps[stepIndex] = {
                ...receipt.steps[stepIndex],
                [propName]: propValue
            };
        }

        this.setState({ receipt });
    }

    generateStepComponents = () => {
        const { stepCount, stepComponents } = this.state;
        const stepComponentIndex = stepComponents.length;

        for (let index = stepComponentIndex; index < stepCount; index++) {
            stepComponents.push(<div>
                <ReceiptStep
                    key={index}
                    stepOrder={index}
                    deleteStep={this.deleteStep}
                    setStepData={this.setStepData}
                />
            </div>);
        }

        this.setState({ stepComponents });
    }

    addStep = () => {
        const { stepCount } = this.state;
        this.setState({
            stepCount: stepCount + 1
        });
        this.generateStepComponents();
    }

    deleteStep = (stepIndex) => {
        const { stepComponents, stepCount } = this.state;
        const updatedStepCount = stepCount - 1;

        if (updatedStepCount === 0) {
            return;
        }

        const updatedStepComponents = stepComponents.filter((_, i) => i !== stepIndex);
        this.setState({
            stepComponents: updatedStepComponents,
            stepCount: stepCount - 1
        });
    }

    resetForm = () => {
        this.setState({
            receipt: {
                name: '',
                cookingDuration: 0,
                description: '',
                steps: []
            },
            stepCount: 1,
            stepComponents: []
        }, () => {
            this.generateStepComponents();
            this.props.navigate('/');
        });
    }

    render() {
        console.log(this.state.receipt);
        const { stepComponents } = this.state;

        return (
            <div>
                <div>
                    <Input
                        name="name"
                        type="text"
                        placeholder="Название рецепта"
                        setFormData={this.setFormData}
                        value={this.state.receipt.name || ''} />
                    <Input
                        name="cookingDuration"
                        type="number"
                        placeholder="Время приготовления"
                        setFormData={this.setFormData} 
                        value={this.state.receipt.cookingDuration} />
                    <Input
                        name="description"
                        type="text"
                        placeholder="Краткое описание рецепта"
                        setFormData={this.setFormData} 
                        value={this.state.receipt.description || ''} />
                </div>
                <div>
                    {stepComponents}
                </div>
                <div>
                    <ActionsButton
                        btnContent="Добавить шаг"
                        clickHandler={this.addStep} />
                </div>
                <div>
                    <ActionsButton btnContent="Отмена" 
                    clickHandler={this.resetForm} />
                    <ActionsButton btnContent="Сохранить"
                        clickHandler={this.createReceipt} />
                </div>


            </div>
        )
    }
}


export default withRouter(AddReceiptForm);
