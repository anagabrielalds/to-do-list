import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as api from '../services/api';
import { useTarefas } from '../context/tabela';

export default function EditarCategorias({ openDialog, setOpenDialog, id, setResponseRequest }) {

  const [editedData, setEditedData] = useState({});
  const { getListaCategorias } = useTarefas();

  useEffect(() => {
    if (id !== undefined && id !== null) getCategoriaById();
  }, [id, openDialog]);

  const handleInputChange = (event, field) => {
    const updatedData = { ...editedData, [field]: event.target.value };
    setEditedData(updatedData);
  };


  const handleSaveClick = () => {

    const updatedItem = { ...editedData };

    updateCategoria(updatedItem);
  };

  async function getCategoriaById() {
    let response = await api.getCategoriaById(id);

    if (parseInt(response.status) === 200) {
      setEditedData(response.data);
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
  };

  async function updateCategoria(data) {

    let response = await api.updateCategory(data);

    if (parseInt(response.status) === 200) {

      setEditedData(null);
      setOpenDialog(false);

      setResponseRequest({ open: true, status: 'success', message: response.message });

      getListaCategorias();
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
  };



  return (
    <>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Editar Categorias</DialogTitle>
        <Divider />
        <DialogContent>
          <TextField
            label="Atividade"
            value={editedData?.description || ''}
            onChange={(e) => handleInputChange(e, 'description')}
            fullWidth
            sx={{ mt: 3, mb: 3 }}
          />

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