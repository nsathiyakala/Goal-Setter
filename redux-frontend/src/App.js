import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
      </Routes>
    </BrowserRouter>

  </>
  );
}

export default App;
