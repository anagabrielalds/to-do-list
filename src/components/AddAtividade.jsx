import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SelectCategoria from "./SelectCategorias";
import ResponseMessage from "./ResponseMessage";
import * as api from '../services/api';
import { useTarefas } from "../context/tabela";

export default function AddAtividade() {

  const [atividade, setAtividade] = useState('');
  const [categoria, setCategoria] = useState('');
  const { getListaTarefas } = useTarefas();

  const [responseRequest, setResponseRequest] = useState({ open: false, status: 'error', message: 'Erro ao adicionar tarefas' });

  async function handleSaveClick() {
    const createItem = { 'description': atividade, 'idCategory': categoria }
    let response = await api.postTarefas(createItem);

    if (parseInt(response.status) === 200) {
      getListaTarefas();

      setAtividade('');
      setCategoria('');

      setResponseRequest({ open: true, status: 'success', message: response.message });
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
  };

  return (
    <>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />

      <Box
        component="form"
        alignContent={"center"}
        sx={{
          '& > :not(style)': { m: 1, width: '25%' },
          display: 'flex',
          justifyContent: 'center',
          marginTop: 2
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          id="outlined-controlled"
          label="Add Atividade"
          size="small"
          value={atividade}
          onChange={(event) => {
            setAtividade(event.target.value);
          }}
          color="primary"
          variant="outlined"
        />

        <SelectCategoria categoria={categoria} setCategoria={setCategoria} />

        <Button variant="contained" size="large" onClick={handleSaveClick} > <AddCircleOutlineRoundedIcon sx={{ marginRight: 1 }} /> Salvar</Button>

      </Box>
    </>
  );
}