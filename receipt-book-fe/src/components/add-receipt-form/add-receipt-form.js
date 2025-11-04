import { Component } from "react";
import Input from '../../shared-components/input/input';
import ReceiptStep from '../../shared-components/receipt-step/receipt-step';
import ActionsButton from '../../shared-components/actions-button/actions-button';
import { withRouter } from '../../shared-components/utils/withRouter.js';
import { postReceipt } from "../../api/receiptsApi.js";
import './add-receipt-form.css';



class AddReceiptForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receipt: {
                steps: []
            },
            stepCount: 1,
        };
    }


    createReceipt = async () => {
        const { name, cookingDuration, description, steps } = this.state.receipt;

        if (!name || name.trim() === '') {
            return alert("Введите название рецепта!");
        }

        if (!cookingDuration || cookingDuration <= 0) {
            return alert("Укажите время приготовления!");
        }

        if (!description || description === '') {
            return alert("Добавьте краткое описание!");
        }

        if (!Array.isArray(steps) || steps.length === 0 || !steps[0]?.stepDescription) {
            return alert("Добавьте хотя бы один шаг!");
        }

        const sortedSteps = [...steps].sort((a,b) => a.stepOrder - b.stepOrder);
        const formattedReceipt = {
            ...this.state.receipt,
            steps: sortedSteps
        };

        try {
            await postReceipt(formattedReceipt);
            alert('Рецепт успешно сохранен!');
            this.resetForm();
            this.props.router.navigate('/');
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
        const updatedSteps = [...receipt.steps];

        const existingStep = updatedSteps[stepIndex] || {};
        updatedSteps[stepIndex] = {
            ...existingStep,
            stepOrder: stepIndex,
            [propName]: propValue
        }

        this.setState({
            receipt: {
                ...receipt,
                steps: updatedSteps
            }
        });
    };

   

    addStep = () => {
        this.setState(prev => ({ stepCount: prev.stepCount + 1 }));
    };

    deleteStep = (stepIndex) => {
        if (stepIndex === 0 || this.state.stepCount <= 1) return;
        this.setState(prev => ({ stepCount: prev.stepCount - 1 }));
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
            this.props.router.navigate('/');
        });
    }

    render() {
        return (
            <div className="receipt-form">
                <div className="input-group">
                    <Input
                        name="name"
                        type="text"
                        placeholder="Название рецепта"
                        setFormData={this.setFormData}
                        value={this.state.receipt.name || ''}
                        min={0} />
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
                <div className="steps-section">
                    {Array.from({ length: this.state.stepCount }).map((_, index) => (
                        <ReceiptStep
                            key={`step-${index}`}
                            stepOrder={index}
                            stepData={this.state.receipt.steps[index] || {}}
                            deleteStep={this.deleteStep}
                            setStepData={this.setStepData}
                        />
                    ))}
                </div>
                <div className="add-step-button">
                    <ActionsButton
                        btnContent="Добавить шаг"
                        clickHandler={this.addStep}
                        className="add-step" />
                </div>
                <div className="form-actions">
                    <ActionsButton btnContent="Отмена"
                        clickHandler={this.resetForm}
                        className="cancel" />
                    <ActionsButton btnContent="Сохранить"
                        clickHandler={this.createReceipt}
                        className="safe" />
                </div>


            </div>
        )
    }
}


export default withRouter(AddReceiptForm);
