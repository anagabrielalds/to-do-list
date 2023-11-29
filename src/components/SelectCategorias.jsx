import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as api from '../services/api';
import ResponseMessage from './ResponseMessage';

export default function SelectCategoria({categoria, setCategoria}) {
  const [categorias, setCategorias] = React.useState([]);
  const [responseRequest, setResponseRequest] = React.useState({open : false, status: 'error', message: 'Erro ao obter categoria'});
  
  const fetchData = async () => {
    try {
      let response = await api.getCategorias();
      if(parseInt(response.status) === 200) setCategorias(response.data);
      else setResponseRequest({open : true, status: 'error', message: response.message});
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  React.useEffect( () => {
        fetchData();
  }, []);

  const handleChange = (event) => {
    setCategoria(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 220 }}>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size='small'
          variant='outlined'
          value={categoria || ''}
          label="Categoria"
          onChange={handleChange}
        >
           {categorias?.map((item) => ( 
              <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
           ))}
        </Select>
      </FormControl>
    </Box>
  );
}
