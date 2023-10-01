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

function TabelaAtividades({data, setData}) {

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

  const tableCell = {background: 'red'}

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
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.atividade}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                {/* <TableCell>{item.data}</TableCell> */}
                <TableCell>
                  {item.checked ? <CheckIcon /> : ''}
                </TableCell>
                <TableCell align='right' size='small'>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={() => handleRowClick(item.id)}><EditIcon /></Button>
                    <Button onClick={() => ExcludedRow(item.id)}><DeleteIcon /></Button>
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
