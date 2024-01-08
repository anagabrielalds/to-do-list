import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ResponseMessage from './ResponseMessage';
import * as api from '../services/api';
import EditarCategorias from './EditarCategorias';
import { useTarefas } from '../context/tabela';

export default function TabelaCategorias() {

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { listaCategorias, getListaCategorias } = useTarefas();

  const [responseRequest, setResponseRequest] = useState({ open: false, status: 'error', message: 'Erro ao buscar categorias' });


  const handleRowClick = (id) => {
    setSelectedRow(id);
    setOpenDialog(true);
  };

  async function ExcludedRow(id) {
    let response = await api.deleteCategorias(id);
    if (parseInt(response.status) === 200) {
      getListaCategorias();
      setSelectedRow(null);
      setResponseRequest({ open: true, status: 'success', message: response.message });
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
  };

  // const tableCell = { background: tema.backgroundMenu, color: tema.font }
  // const tableCellRow = { background: tema.tableCellRow, color: tema.font }

  return (
    <>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 4, width: '80%' }}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell >Id</TableCell>
                <TableCell >Categorias</TableCell>
                <TableCell size='small' align='center' >Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {listaCategorias?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell >{item.id}</TableCell>
                  <TableCell >{item.description}</TableCell>
                  <TableCell align='right' size='small'>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                      <Button  onClick={() => handleRowClick(item.id)}><EditIcon /></Button>
                      <Button  onClick={() => ExcludedRow(item.id)}><DeleteIcon /></Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <EditarCategorias openDialog={openDialog} setOpenDialog={setOpenDialog} id={selectedRow} setResponseRequest={setResponseRequest} />

      </div>
    </>
  );
}

