import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }

  }, []);

  async function Login(userData) {
    
    const response = await api.login(userData);

    if(parseInt(response.status) === 200){
      let token = response.data.token;
  
      setUser(response.data.username);
  
      sessionStorage.setItem('@App:user', JSON.stringify(response.data));
      sessionStorage.setItem('@App:token', token);
    }
    return response;
  }

  async function Register(userData) {
    const response = await api.register(userData);
    return response;
  }

  function Logout() {
    setUser(null);
    sessionStorage.removeItem('@App:user'); 
    sessionStorage.removeItem('@App:token'); 
    api.resetHeader();
  }

  return (
    <AuthContext.Provider value={{ signed : Boolean(user), user,Login, Register, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}