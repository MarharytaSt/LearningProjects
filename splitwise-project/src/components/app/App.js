import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../header/Header';
import MainPage from '../mainPage/MainPage';
import CreateAccountPage from '../createAccountPage/CreateAccountPage';
import EditAccountPage from "../editAccountPage/EditAccountPage";
import AddTransactionPage from "../addTransactionPage/AddTransactionPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/create-account" element={<CreateAccountPage/>}/>
          <Route path="/edit-account/:id" element={<EditAccountPage/>}/>
          <Route path="/add-transaction/:id" element={<AddTransactionPage/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
