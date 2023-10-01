import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import SelectCategoria from "./SelectCategorias";

export default function AddAtividade({ lista, setLista }) {

  const [atividade, setAtividade] = useState('');
  const [categoria, setCategoria] = useState('');

  const handleSaveClick = () => {

    const maxId = lista.reduce(function (prev, current) {
      return prev.id > current.id ? prev : current;
    });

    const DateNow = new Date().toISOString().split('T')[0];
    const createItem = { id: (maxId.id + 1), atividade: atividade, categoria: categoria, data: DateNow, checked: false }

    setLista( [...lista, createItem]);
    setAtividade('');
    setCategoria('');
  };


  return (

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
      />

      <SelectCategoria categoria={categoria} setCategoria={setCategoria} />

      <Button size="large" onClick={handleSaveClick}> <AddCircleOutlineRoundedIcon sx={{ marginRight: 1 }} /> Salvar</Button>

    </Box>
  );
}