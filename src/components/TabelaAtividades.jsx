import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditarAtividade from './EditarAtividade';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '../context/theme';

function TabelaAtividades({data, setData}) {

  const {tema } = useTheme();

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleRowClick = (id) => {
    setSelectedRow(id);
    setOpenDialog(true);
  };

  const ExcludedRow = (id) => {
    const updatedData = data.filter((item) => (item.id !== id));
    setData(updatedData);
    setSelectedRow(null);
  };

  const tableCell = {background: tema.backgroundMenu, color: tema.font}
  const tableCellRow= {background: tema.tableCellRow, color: tema.font}

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <TableContainer component={Paper} sx={{marginTop: 4, marginBottom: 4, width: '80%'}}>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell sx={tableCell}>Atividades</TableCell>
              <TableCell sx={tableCell}>Categoria</TableCell>
              {/* <TableCell sx={tableCell}>Data</TableCell> */}
              <TableCell sx={tableCell}>Concluído</TableCell>
              <TableCell size='small' align='center' sx={tableCell}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={tableCellRow}>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell sx={tableCellRow}>{item.atividade}</TableCell>
                <TableCell sx={tableCellRow}>{item.categoria}</TableCell>
                {/* <TableCell>{item.data}</TableCell> */}
                <TableCell sx={tableCellRow}>
                  {item.checked ? <CheckIcon  sx={{color: 'green'}}/> : <ClearIcon  sx={{color: 'red'}}/>}
                </TableCell >
                <TableCell align='right' size='small'>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{color: tema.font}}>
                    <Button sx={{background: tema.backgroundMenu}} onClick={() => handleRowClick(item.id)}><EditIcon /></Button>
                    <Button sx={{background: tema.backgroundMenu}} onClick={() => ExcludedRow(item.id)}><DeleteIcon /></Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EditarAtividade openDialog={openDialog} setOpenDialog={setOpenDialog}  id={selectedRow} data={data} setData={setData} setSelectedRow={setSelectedRow}/>
    
    </div>
  );
}

export default TabelaAtividades;
