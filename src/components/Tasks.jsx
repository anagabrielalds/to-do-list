import { useState } from "react";
import TabelaAtividades from "./TabelaAtividades";
import AddAtividade from "./AddAtividade";


export default function Tasks() {

  const [listaAtividades, setListaAtividades] = useState([
    { id: 1, atividade: 'Tarefa Fazer testes no Aché, PharmaCode e demais sistemas e não esquecer das reuniões', categoria: 'Trabalho', data: '2023-09-30', checked: false },
    { id: 2, atividade: 'Tarefa 2', categoria: 'Casa', data: '2023-09-30', checked: true },
    { id: 3, atividade: 'Tarefa 3', categoria: 'Lazer', data: '2023-09-30', checked: false },
  ]);
 

  return (
    <>
      <AddAtividade lista={listaAtividades} setLista={setListaAtividades}/>

      <TabelaAtividades data={listaAtividades} setData={setListaAtividades}  />
    </>
);
}
