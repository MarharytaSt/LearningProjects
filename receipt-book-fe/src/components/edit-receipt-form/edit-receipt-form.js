import { Component } from "react";
import './edit-receipt-form.css';


class EditReceiptForm extends Component {




    render() {
        const { recipe, editedRecipe, isEditing, onSave, onCancel, onChangeEditedRecipe } = this.props;
        const stepsToRender = isEditing ? editedRecipe?.description?.steps || [] : recipe?.description?.steps || [];

        if (!recipe) return <p>Загрузка...</p>;

        return (
            <div>
                <div className="form-info">
                    {isEditing ? (
                        <>
                            <span>Название рецепта: </span>
                            <input
                                type="text"
                                value={editedRecipe.name}
                                onChange={e =>
                                    onChangeEditedRecipe({
                                        ...editedRecipe,
                                        name: e.target.value
                                    })}
                            />
                            <span>Время приготовления: </span>
                            <input
                                type="number"
                                value={editedRecipe.cookingDuration}
                                onChange={e =>
                                    onChangeEditedRecipe({
                                        ...editedRecipe,
                                        cookingDuration: Number(e.target.value)
                                    })}
                            />
                            <span>Краткое описание: </span>
                            <textarea
                                value={editedRecipe?.description?.shortDescription || ''}
                                onChange={e => {
                                    if (!editedRecipe) return;
                                    onChangeEditedRecipe({
                                        ...editedRecipe,
                                        description: {
                                            ...editedRecipe.description,
                                            shortDescription: e.target.value
                                        }
                                    });
                                }
                                }
                            />
                        </>
                    ) : (
                        <>
                            <p><span className="form-label">Название рецепта:</span> {recipe.name}</p>
                            <p><span className="form-label">Время приготовления:</span> {recipe.cookingDuration} минут</p>
                            <p><span className="form-label">Краткое описание:</span> {recipe?.description?.shortDescription || ''}</p>
                        </>
                    )}
                </div>

                <div className="form-steps">
                    {stepsToRender.map((step, index) => (
                        <div key={index} className="step-block">
                            {isEditing ? (
                                <div className="step-row">
                                    <input
                                        type="number"
                                        value={step.stepOrder + 1}
                                        disabled
                                    />
                                    <textarea
                                        value={step.stepDescription}
                                        onChange={e => {
                                            const newSteps = [...editedRecipe.description.steps];
                                            newSteps[index].stepDescription = e.target.value;
                                            onChangeEditedRecipe({
                                                ...editedRecipe,
                                                description: {
                                                    ...editedRecipe.description,
                                                    steps: newSteps
                                                }
                                            })
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            const filterSteps = editedRecipe.description.steps.filter((_, i) => i !== index);
                                            const renumberedSteps = filterSteps.map((step, i) => ({
                                                ...step,
                                                stepOrder: i
                                            }));
                                            onChangeEditedRecipe({
                                                ...editedRecipe,
                                                description: {
                                                    ...editedRecipe.description,
                                                    steps: renumberedSteps
                                                }
                                            });
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p>Шаг {step.stepOrder + 1}</p>
                                    <p>{step.stepDescription}</p>
                                </>
                            )}
                        </div>
                    ))}

                    {isEditing && (
                        <div className="edit-actions-group">
                            <button
                                onClick={() => {
                                    const newSteps = [...editedRecipe.description.steps];
                                    const newStep = {
                                        stepOrder: newSteps.length,
                                        stepDescription: ''
                                    };
                                    newSteps.push(newStep);
                                    onChangeEditedRecipe({
                                        ...editedRecipe,
                                        description: {
                                            ...editedRecipe.description,
                                            steps: newSteps
                                        }
                                    });
                                }}
                            >
                                Добавить шаг
                            </button>
                            <button onClick={onSave}>Сохранить</button>
                            <button onClick={onCancel}>Отмена</button>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default EditReceiptForm;