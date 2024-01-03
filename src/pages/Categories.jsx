import { useState, useEffect } from "react";
import * as api from '../services/api';
import ResponseMessage from "../components/ResponseMessage";
import TabelaCategorias from "../components/TabelaCategorias";
import AddCategorias from "../components/AddCategorias";


export default function Categories() {
  const [listaCategorias, setListaCategorias] = useState(null);

  const [responseRequest, setResponseRequest] = useState({ open: false, status: 'error', message: 'Preencha o usuário e senha' });

  const fetchData = async () => {
    try {
      let response = await api.getCategorias();

      if (parseInt(response.status) === 200) setListaCategorias(response.data);
      else setResponseRequest({ open: true, status: 'error', message: response.message });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />

      <AddCategorias />

      {listaCategorias != null ? <TabelaCategorias listaCategorias={listaCategorias} /> : <h1>Não há tarefas cadastradas</h1>}

    </>
  );
}
