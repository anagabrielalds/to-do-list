import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditarAtividade from './EditarAtividade';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import ResponseMessage from './ResponseMessage';
import * as api from '../services/api';
import { useTarefas } from '../context/tabela';

function TabelaAtividades() {

  const { listaTarefas, getListaTarefas } = useTarefas();

  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [responseRequest, setResponseRequest] = useState({ open: false, status: 'error', message: 'Erro ao buscar tarefas' });

  const handleRowClick = (id) => {
    setSelectedRow(id);
    setOpenDialog(true);
  };

  async function ExcludedRow(id) {
    let response = await api.deleteTarefas(id);
    if (parseInt(response.status) === 200) {
      getListaTarefas();
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
        <TableContainer component={Paper} sx={{ marginTop: 4, marginBottom: 4, width: '80%', maxHeight: '350px'}}>
          <Table sx={{overflowY: 'scroll' }}>
            <TableHead >
              <TableRow >
                <TableCell >Atividades</TableCell>
                <TableCell >Categoria</TableCell>
                <TableCell >Concluído</TableCell>
                <TableCell size='small' align='center' >Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {listaTarefas?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell >{item.description}</TableCell>
                  <TableCell >{item.category.description}</TableCell>
                  {/* <TableCell>{item.data}</TableCell> */}
                  <TableCell >
                    {item.checked ? <CheckIcon sx={{ color: 'green' }} /> : <ClearIcon sx={{ color: 'red' }} />}
                  </TableCell >
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

        <EditarAtividade openDialog={openDialog} setOpenDialog={setOpenDialog} id={selectedRow} setResponseRequest={setResponseRequest} />

      </div>
    </>
  );
}

export default TabelaAtividades;
