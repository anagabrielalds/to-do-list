import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../services/api';

const TafefasContext = createContext({});

export const TarefasProvider = ({ children }) => {
  const [listaTarefas, setListaTarefas] = useState(null);

  useEffect(() => {
    getListaTarefas();
  }, []);

  async function getListaTarefas() {
    const response = await api.getTarefas();

    if(parseInt(response.status) === 200){
      setListaTarefas(response.data);
    }
    return response;
  }

  return (
    <TafefasContext.Provider value={{ listaTarefas, setListaTarefas, getListaTarefas}}>
      {children}
    </TafefasContext.Provider>
  );
};

export function useTarefas() {
  const context = useContext(TafefasContext);
  return context;
}