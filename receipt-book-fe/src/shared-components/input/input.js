import { Component } from "react";



class Input extends Component {
    render() {

        const { placeholder, type, name, setFormData, value } = this.props;

        return (
            <div className="text-input">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setFormData(name, e.target.value)} />
            </div>
        )
    }
}


export default Input;