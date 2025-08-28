import './app.css';
import apiServices from '../../services/apiServices';
import { Component } from 'react';


class App extends Component {

  test = async () => {

    const response = await apiServices.getAsync('/');

    console.log(response);
    
  }


  render() {
    return (
      <div className="App">
        <button onClick={this.test}>Test</button>
      </div>
    );
  }
}

export default App;
