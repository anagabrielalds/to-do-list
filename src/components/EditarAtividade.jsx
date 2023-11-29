import { Button, Dialog, DialogTitle, DialogContent, TextField, Checkbox, DialogActions, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SelectCategoria from './SelectCategorias';
import * as api from '../services/api';
import { useTarefas } from '../context/tabela';

export default function EditarAtividade({ openDialog, setOpenDialog, id, setResponseRequest  }) {

  const [editedData, setEditedData] = useState({});
  const [categoria, setCategoria] = useState('');
  const { getListaTarefas } = useTarefas();

  useEffect(() => {
    if(id !== undefined && id !== null) getTarefaById();
  }, [id, openDialog]);

  const handleInputChange = (event, field) => {
    const updatedData = { ...editedData, [field]: event.target.value };
    setEditedData(updatedData);
  };

  const handleCheckboxChange = (event) => {
    const updatedData = { ...editedData, checked: event.target.checked };
    setEditedData(updatedData);
  };

  const handleSaveClick = () => {
    
    const updatedItem = { ...editedData, 'idCategory': categoria };
    delete updatedItem.dateOfCreation;
    delete updatedItem.idUser;

    updateTarefa(updatedItem);
  };

  async function getTarefaById () {
    let response = await api.getTarefasById(id);

    if(parseInt(response.status) === 200) {
      setEditedData(response.data);
      setCategoria(response.data.idCategory);
    }
    else{
      setResponseRequest({open : true, status: 'error', message: response.message});
    }
  };

  async function updateTarefa (data) {

    let response = await api.updateTarefas(data);

    if(parseInt(response.status) === 200) {

      setEditedData(null);
      setOpenDialog(false);

      setResponseRequest({open : true, status: 'success', message: response.message});

      getListaTarefas();
    }
    else{
      setResponseRequest({open : true, status: 'error', message: response.message});
    }
  };

  

  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}  fullWidth>
        <DialogTitle>Editar Atividades</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            label="Atividade"
            value={editedData?.description || ''}
            onChange={(e) => handleInputChange(e, 'description')}
            fullWidth
            sx={{mt: 3, mb: 3}}
          />

          <SelectCategoria categoria={categoria} setCategoria={setCategoria} />

          <Checkbox
            checked={editedData?.checked || false}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'controlled' }}
          /> Completar
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveClick} variant="contained" color="primary">
            Salvar
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}