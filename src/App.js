import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import MenuApp from './components/MenuApp';
import { AuthProvider, useAuth } from './context/auth';
import {Navigate, Outlet} from 'react-router-dom';
import Login from './pages/Login';

const PrivateRoute = () => {
  const { signed } = useAuth();
  return signed  ? <> <MenuApp /><Outlet /></> : <Navigate to="/login" />;

};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact path='/' element={<Tasks/>}/>
              <Route path='categoria' element={<h1>categorias</h1>} />
            </Route>
            <Route path='login' element={<Login />}/>
            <Route path='logout' element={<h1>SingOut</h1>} />
            <Route path='*' element={<h1>NotFound</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
 
export default App;
 