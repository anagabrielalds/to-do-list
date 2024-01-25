import React, { createContext, useState, useContext } from 'react';
import { Navigate } from "react-router-dom";
import * as api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

  const storagedUser = sessionStorage.getItem('@App:user');
  const storagedToken = sessionStorage.getItem('@App:token');

  const [user, setUser] = useState(storagedToken && storagedUser);
  const [isRecoveryPassword, setIsRecoveryPassword] = useState(false);

  async function Login(userData) {

    const response = await api.login(userData);

    if (parseInt(response.status) === 200) {
      let token = response.data.token;

      setUser(response.data.username);

      sessionStorage.setItem('@App:user', JSON.stringify(response.data));
      sessionStorage.setItem('@App:token', token);
    }
    return response;
  }

  async function AuthenticateWithMailAndPasswordRecovery(data) {

    const response = await api.authenticateWithMailAndPasswordRecovery(data);

    if (parseInt(response.status) === 200) {
      let token = response.data.token;

      setIsRecoveryPassword(true);
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

  async function isSigned() {
    var isSigned = Boolean(user);
    return isSigned;
  }

  function Logout() {
    setUser(null);
    setIsRecoveryPassword(false);
    sessionStorage.removeItem('@App:user');
    sessionStorage.removeItem('@App:token');
    api.resetHeader();
  }

  return (
    <AuthContext.Provider value={{ isSigned, user, Login,AuthenticateWithMailAndPasswordRecovery, Register, Logout,isRecoveryPassword, setIsRecoveryPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}