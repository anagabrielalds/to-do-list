import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useTheme } from "../context/theme";
import ResponseMessage from "./ResponseMessage";
import * as api from '../services/api';
import { useTarefas } from "../context/tabela";

export default function AddCategorias() {

  const { tema } = useTheme();

  const [categoria, setCategoria] = useState('');
  const { getListaCategorias } = useTarefas();

  const [responseRequest, setResponseRequest] = useState({ open: false, status: 'error', message: 'Erro ao adicionar Categorias' });

  async function handleSaveClick() {
    const createItem = { 'description': categoria }
    let response = await api.postCategorias(createItem);

    if (parseInt(response.status) === 200) {
      getListaCategorias();
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
          label="Add Categoria"
          size="small"
          value={categoria}
          onChange={(event) => {
            setCategoria(event.target.value);
          }}
          color="primary"
          variant="outlined"
        />

        <Button variant="contained" size="large" onClick={handleSaveClick} sx={{ background: tema.backgroundMenu, color: tema.font }}> <AddCircleOutlineRoundedIcon sx={{ marginRight: 1 }} /> Salvar</Button>

      </Box>
    </>
  );
}