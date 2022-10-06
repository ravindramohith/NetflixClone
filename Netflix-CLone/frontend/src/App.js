import './app.scss'
import Home from "./pages/home/Home";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {AuthContext} from './context/AuthContext/AuthContext'
import { useContext } from 'react';

function App() {
  const {user}=useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/register" replace />} />
        {user && (<>
          <Route path='/movies' element={<Home type="movie" />} />
          <Route path='/series' element={<Home type="series" />} />
          <Route path='/watch/:id' element={<Watch />} />
        </>)}
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" replace />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
