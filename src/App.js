import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './View/loginPage';
import HomePage from './View/homePage';
import SignUpPage from './View/signupPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LoginPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/sign' element={<SignUpPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
