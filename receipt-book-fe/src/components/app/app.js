import './app.css';
import { Component } from 'react';
import MainPage from '../main-page/main-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddReceiptPage from '../add-receipt-page/add-receipt-page';
import {MainPageRoute, AddReceiptPageRoute, } from '../../settings/appRoutes';
import EditReceiptPage from '../edit-receipt-page/edit-receipt-page';



class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Routes>
            <Route path={MainPageRoute} element={<MainPage/>}/>
            <Route path={AddReceiptPageRoute} element={<AddReceiptPage/>}/>
            <Route path="/edit-receipt/:id" element={<EditReceiptPage/>}/>
          </Routes>
        </Router>

      </div>
    );
  }
}

export default App;
