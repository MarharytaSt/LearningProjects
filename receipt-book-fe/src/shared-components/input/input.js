import { Component } from "react";
import './input.css';



class Input extends Component {
    render() {

        const { placeholder, type, name, setFormData, value, ...rest } = this.props;

        return (
            <div className="text-input">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setFormData(name, e.target.value)}
                    {...rest} />
            </div>
        )
    }
}


export default Input;