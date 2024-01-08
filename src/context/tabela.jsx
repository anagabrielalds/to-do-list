import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../services/api';
import { useAuth } from './auth';

const TafefasContext = createContext({});

export const TarefasProvider = ({ children }) => {
  const { signed } = useAuth();
  const [listaTarefas, setListaTarefas] = useState(null);
  const [listaCategorias, setListaCategorias] = useState(null);

  useEffect(() => {
    if(signed){
      getListaTarefas();
      getListaCategorias();
    }

  }, []);

  async function getListaTarefas() {
    const response = await api.getTarefas();

    if (parseInt(response.status) === 200) {
      setListaTarefas(response.data);
    }
    return response;
  }
  async function getListaCategorias() {
    const response = await api.getCategorias();

    if (parseInt(response.status) === 200) {
      setListaCategorias(response.data);
    }
    return response;
  }

  return (
    <TafefasContext.Provider value={{ listaTarefas, setListaTarefas, getListaTarefas, listaCategorias, setListaCategorias, getListaCategorias }}>
      {children}
    </TafefasContext.Provider>
  );
};

export function useTarefas() {
  const context = useContext(TafefasContext);
  return context;
}