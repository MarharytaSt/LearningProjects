import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../shared-components/utils/withRouter";
import { MainPageRoute } from '../../settings/appRoutes';
import EditReceiptPageHeader from '../edit-receipt-page-header/edit-receipt-page-header';
import EditReceiptForm from '../edit-receipt-form/edit-receipt-form';
import { getReceiptById } from '../../api/receiptsApi';
import { updateReceiptById } from '../../api/receiptsApi';
import { deleteReceiptById } from '../../api/receiptsApi';
import ActionsButton from '../../shared-components/actions-button/actions-button';
import './edit-receipt-page.css';



class EditReceiptPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            isEditing: false,
            editedRecipe: null

        };

    }


    async componentDidMount() {
        const { id } = this.props.router.params;
        try {
            const recipe = await getReceiptById(id);
            this.setState({ recipe });
        } catch (error) {
            console.error('Ошибка при загрузке рецепта', error.message);
        }

    }

    deleteReceipt = async () => {
        const { id } = this.props.router.params;

        try {
            const status = await deleteReceiptById(id);
            if (status === 200 || status === 204) {
                this.props.router.navigate(MainPageRoute);
            }
        } catch (error) {
            console.error('Ошибка при удалении рецепта', error.message);
        }
    };

    handleEditClick = () => {
        this.setState({
            isEditing: true,
            editedRecipe: JSON.parse(JSON.stringify(this.state.recipe))
        });
    };

    handleCancel = () => {
        this.setState({
            isEditing: false,
            editedRecipe: null
        });
    };

    handleSave = async () => {
        const { id } = this.props.router.params;
        const { editedRecipe } = this.state;
        const { name, cookingDuration, description } = editedRecipe;

        const hasEmptyFields =
            !name.trim() ||
            !description?.shortDescription?.trim() ||
            !cookingDuration 

        const stepsValid = 
        Array.isArray(description?.steps) &&
        description.steps.length > 0 &&
        description.steps.every(
            step => step && typeof step.stepDescription === 'string' &&
            step.stepDescription.trim() !== ''
        );

        if (hasEmptyFields || !stepsValid) {
            return alert("Пожалуйста, заполните все поля!");
        }

        try {
            await updateReceiptById(id, this.state.editedRecipe);
            this.setState({
                recipe: this.state.editedRecipe,
                editedRecipe: null,
                isEditing: false
            });
        } catch (error) {
            console.error('Ошибка при сохранении рецепта', error.message);
        }
    };


    render() {
        const { recipe } = this.state;
        if (!recipe) return <p>Загрузка...</p>

        const { id } = this.props.router.params;

        return (
            <div>
                {recipe && <EditReceiptPageHeader header={`Рецепт блюда: ${recipe.name}`} />}
                <div className="page-wrapper">
                    <EditReceiptForm
                        recipe={recipe}
                        steps={recipe.steps}
                        receiptId={id}
                        isEditing={this.state.isEditing}
                        editedRecipe={this.state.editedRecipe}
                        onSave={this.handleSave}
                        onCancel={this.handleCancel}
                        onChangeEditedRecipe={(updated) => this.setState({ editedRecipe: updated })}
                    />
                </div>
                <div className="page-btns">
                    <Link to={MainPageRoute} className="link-button">
                        Назад
                    </Link>
                    <ActionsButton btnContent="Редактировать"
                        clickHandler={this.handleEditClick}
                        className="edited" />
                    <ActionsButton btnContent="Удалить"
                        clickHandler={this.deleteReceipt}
                        className="remove" />
                </div>
            </div>

        )
    }
}


export default withRouter(EditReceiptPage);