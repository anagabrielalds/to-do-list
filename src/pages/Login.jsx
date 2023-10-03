import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { Button } from '@mui/material';
import { useTheme } from '../context/theme';

export default function StateTextFields() {
  const { signed, Login } = useAuth();
  const { tema } = useTheme();
  const [user, setUser] = React.useState();
  const [senha, setSenha] = React.useState();
  const navigate = useNavigate();

    React.useEffect(() => {
     if(signed) navigate("/");
    }, [signed]);


  async function handleLogin() {
    await Login({
      email: 'rafaelcodomingues@gmail.com',
      password: '123456',
    });
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'89%'}
    >
      <Box
        component="form"
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        width={'60%'}
        height={'70%'}

        sx={{
          background: tema.backgroundMenu,
          margin: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-controlled"
          label="userName | userLogin"
          variant='filled'
          sx={{ margin: 4, width: '80%', background: tema.background }}
          value={user}
          onChange={(event) => {
            setUser(event.target.value);
          }}
        />
        <TextField
          id="outlined-controlled"
          label="Senha"
          type='password'
          variant='filled'
          sx={{ margin: 4, width: '80%', background: tema.background }}
          value={senha}
          onChange={(event) => {
            setSenha(event.target.value);
          }}
        />
        <Button variant='contained' onClick={handleLogin} sx={{ margin: 4, width: '80%' }}> Entrar</Button>
      </Box>
    </Box>
  );
}
