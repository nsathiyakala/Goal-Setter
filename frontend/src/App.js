import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import LogIn from './pages/LogIn';

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
