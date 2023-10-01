import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Checkbox,
  DialogActions,
  Select,
} from '@mui/material';
import React, { useEffect,useState } from 'react';
import SelectCategoria from './SelectCategorias';


export default function EditarAtividade({openDialog, setOpenDialog, id, data, setData, setSelectedRow}) {

  const [editedData, setEditedData] = useState({});
  const [categoria, setCategoria] = useState('');

  useEffect(() => {
    const item = (data.filter((item) => (item.id ===  id)));
    setEditedData(...item);
   
    setCategoria(item[0]?.categoria);
  }, [id, openDialog]);

  const handleInputChange = (event, field) => {
    const updatedData = { ...editedData, [field]: event.target.value  };
    setEditedData(updatedData);
  };

  const handleCheckboxChange = (event) => {
    debugger
    const updatedData = { ...editedData, checked: event.target.checked };
    setEditedData(updatedData);
  };


  const handleSaveClick = () => {
    const updatedItem = { ...editedData, 'categoria': categoria };

      const updatedData = data.map((item) => (item.id === updatedItem.id ? updatedItem : item));
      setData(updatedData);
      setSelectedRow(null);
      setEditedData(null);
      setOpenDialog(false);

  };

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Editar Dados</DialogTitle>
      <DialogContent>
        <TextField
          label="Atividade"
          value={editedData?.atividade || ''}
          onChange={(e) => handleInputChange(e, 'atividade')}
          fullWidth
        />

        <SelectCategoria categoria={categoria} setCategoria={setCategoria} />

        <TextField
          label="Data"
          type="date"
          value={editedData?.data || ''}
          onChange={(e) => handleInputChange(e, 'data')}
          fullWidth
        />
      
        <Checkbox
          checked={editedData?.checked || false}
          onChange={handleCheckboxChange}
          inputProps={{ 'aria-label': 'controlled' }}
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
  );
}