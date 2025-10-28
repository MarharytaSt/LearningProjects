import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "../../shared-components/utils/withRouter";
import {MainPageRoute} from '../../settings/appRoutes';
import EditReceiptPageHeader from '../edit-receipt-page-header/edit-receipt-page-header';
import EditReceiptForm from '../edit-receipt-form/edit-receipt-form';
import {getReceiptById} from '../../api/receiptsApi';
import ActionsButton from '../../shared-components/actions-button/actions-button';
import './edit-receipt-page.css';



class EditReceiptPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
        recipe: null
    };
        
    }
    

    async componentDidMount() {
        const {id} = this.props.router.params;
        try {
            const recipe = await getReceiptById(id);
            this.setState({recipe});
        } catch (error) {
            console.error('Ошибка при загрузке рецепта', error.message);
        }
        
    }
    

    render(){
        const {recipe} = this.state;
        if(!recipe) return <p>Загрузка...</p> 

        const {id} = this.props.router.params;

        return(
            <div>
                {recipe && <EditReceiptPageHeader header={`Рецепт блюда: ${recipe.name}`}/>}
                <div className="page-wrapper">
                    <EditReceiptForm 
                    recipe={recipe}
                    steps={recipe.steps}
                    receiptId={id}/>
                </div>
                <div className="page-btns">
                    <Link to={MainPageRoute} className="link-button">
                    Назад
                    </Link>
                    <ActionsButton btnContent="Редактировать" 
                    // clickHandler={}
                    className="edited" />
                    <ActionsButton btnContent="Удалить"
                    // clickHandler={}
                    className="remove" />
                </div>
            </div>
            
        )
    }
}


export default withRouter(EditReceiptPage);