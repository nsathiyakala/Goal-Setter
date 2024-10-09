import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import {Provider} from 'react-redux'
import store from './app/store'
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>

  </Provider>
  );
}

export default App;
