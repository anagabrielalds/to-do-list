import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCategoria({categoria, setCategoria}) {

  const handleChange = (event) => {
    setCategoria(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size='small'
          value={categoria || ''}
          label="Categoria"
          onChange={handleChange}
        >
          <MenuItem value={'Trabalho'}>Trabalho</MenuItem>
          <MenuItem value={'Estudos'}>Estudos</MenuItem>
          <MenuItem value={'Casa'}>Casa</MenuItem>
          <MenuItem value={'Lazer'}>Lazer</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}