import { Box, Button } from "@mui/material";
import TaskIcon from '@mui/icons-material/TaskAlt';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useTheme } from '../context/theme';
import ResponseMessage from "../components/ResponseMessage";

export default function Register() {
  const [user, setUser] = React.useState();
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const { signed, Register } = useAuth();
  const navigate = useNavigate();

  const [responseRequest, setResponseRequest] = React.useState({ open: false, status: 'error', message: 'Preencha o usuário e senha' });

  const { IconMode, toggleTheme } = useTheme();

  React.useEffect(() => {
    if (signed) navigate("/");
  }, [signed]);


  async function handleRegister() {
    var model = {
      "username": user,
      "mail": email,
      "password": senha,
      "imagePath": ""
    }
    let response = await Register(model);
    if (parseInt(response.status) === 200) {
      setResponseRequest({ open: true, status: 'success', message: response.message + ". Faça o Login!" });
      setTimeout(() => { return navigate("/"); }, 5000);
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
  }

  function handleLogin() {
    return navigate("/login");
  }

  return (
    <>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />

      <Box width={'100%'} height={'100vh'} display={'flex'}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} sx={{backgroundColor: 'contrastLoginColor', width: '50%'}}>
          <div>
            <TaskIcon sx={{ fontSize: 100, marginTop: 10 }} />
          </div>
        </Box>
        <Box sx={{ width: '50%' }} height={'100vh'}>
          <Button
            onClick={toggleTheme}
            sx={{ my: 2, display: 'block', ml: '80%' }}
          >
            {IconMode}
          </Button>
          <Box
            component="form"
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            noValidate
            autoComplete="off"
            mt={5}
          >
            <h3>Registrar-se</h3>
            <TextField
              id="username"
              label="UserName"
              variant='filled'
              sx={{ m: 2, width: '70%' }}
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
              }}

            />
            <TextField
              id="email"
              label="Email"
              variant='filled'
              sx={{ m: 2, width: '70%' }}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}

            />
            <TextField
              id="password"
              label="Senha"
              type='password'
              variant='filled'
              sx={{ m: 2, width: '70%' }}
              value={senha}
              onChange={(event) => {
                setSenha(event.target.value);
              }}
              fullWidth
            />
            <Button variant='contained' onClick={handleRegister} sx={{ margin: 2, width: '70%' }}> Registrar</Button>
            <Button variant="outlined" onClick={handleLogin} sx={{ margin: 2, width: '70%' }}>Login</Button>
          </Box>
        </Box>
      </Box>
    </>

  );
}