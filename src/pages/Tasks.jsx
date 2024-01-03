import { useState, useEffect } from "react";
import TabelaAtividades from "../components/TabelaAtividades";
import AddAtividade from "../components/AddAtividade";
import * as api from '../services/api';
import ResponseMessage from "../components/ResponseMessage";


export default function Tasks() {

  const [listaAtividades, setListaAtividades] = useState(null);

  const [responseRequest, setResponseRequest] = useState({ open: false, status: 'error', message: 'Preencha o usuário e senha' });

  const fetchData = async () => {
    try {
      let response = await api.getTarefas();

      if (parseInt(response.status) === 200) setListaAtividades(response.data);
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

      <AddAtividade />

      {listaAtividades != null ? <TabelaAtividades /> : <h1>Não há tarefas cadastradas</h1>}

    </>
  );
}
