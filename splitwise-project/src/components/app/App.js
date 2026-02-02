import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../header/Header';
import MainPage from '../mainPage/MainPage';
import CreateAccountPage from '../createAccountPage/CreateAccountPage';
import EditAccountPage from "../editAccountPage/EditAccountPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/create-account" element={<CreateAccountPage/>}/>
          <Route path="/edit-account/:id" element={<EditAccountPage/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
