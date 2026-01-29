import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from '../header/Header';
import MainPage from '../mainPage/MainPage';
import CreateAccountPage from '../createAccountPage/CreateAccountPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/create-account" element={<CreateAccountPage/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
