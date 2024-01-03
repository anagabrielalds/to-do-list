/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';

const API_URL = 'https://localhost:7195/api/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('@App:token')}`, 
  },
});

// Configuração do interceptor para lidar com erros de resposta
api.interceptors.response.use(
  (response) => {
    return response; // Retorna a resposta se estiver tudo ok
  },
  async (error) => {
  if (error.code === 'ERR_NETWORK' || error.response.status === 401) {
     return window.location.href = '/login';
    }
    return Promise.reject(error); // Retorna a rejeição da promessa se não for um erro 401
  }
);

export const resetHeader = async () => {
  delete api.defaults.headers.Authorization;
  delete axios.defaults.headers.Authorization;
  
};

export const login = async (data) => {
  try {
    const response = await axios.post(API_URL + "login/authenticate", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Erro no Login:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};


export const register = async (data) => {
  try {
    const response = await axios.post(API_URL + "user/register", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Erro ao tentar se registrar:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const getCategorias = async () => {
  try {
    const response = await api.get(API_URL + "category");
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const getTarefas = async () => {
  try {
    const response = await api.get(API_URL + "tasks");
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const getTarefasById = async (id) => {
  try {
    const response = await api.get(API_URL + "tasks/" + id);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const deleteTarefas = async (id) => {
  try {
    const response = await api.delete(API_URL + "tasks/" + id);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir itens:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const updateTarefas = async (data) => {
  try {
    const response = await api.put(API_URL + "tasks/" + data?.id, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir itens:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const postTarefas = async (data) => {
  try {
    const response = await api.post(API_URL + "tasks", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Erro no Login:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const postCategorias = async (data) => {
  try {
    const response = await api.post(API_URL + "category", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Erro no Login:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const deleteCategorias = async (id) => {
  try {
    const response = await api.delete(API_URL + "category/" + id);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir itens:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const getCategoriaById = async (id) => {
  try {
    const response = await api.get(API_URL + "category/" + id);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};

export const updateCategory = async (data) => {
  try {
    const response = await api.put(API_URL + "category/" + data?.id, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir itens:', error);
    if(error.code !== 'ERR_NETWORK') return error.response.data;
  }
};
