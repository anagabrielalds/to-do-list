import { Box, Button } from "@mui/material";
import TaskIcon from '@mui/icons-material/TaskAlt';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useTheme } from '../context/theme';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ResponseMessage from "../components/ResponseMessage";

export default function Register() {
  const [user, setUser] = React.useState();
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();
  const { signed, Register } = useAuth();
  const navigate = useNavigate();

  const [responseRequest, setResponseRequest] = React.useState({open : false, status: 'error', message: 'Preencha o usuário e senha'});

  const { tema, isDarkTheme, toggleTheme } = useTheme();

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
    if(parseInt(response.status) === 200) {
      setResponseRequest({open : true, status: 'success', message: response.message + ". Faça o Login!"});
      setTimeout(() => { return navigate("/"); }, 5000);
    }
    else
    {
      setResponseRequest({open : true, status: 'error', message: response.message});
    }
  }
  function handleLogin() {
    return navigate("/login");
  }

  return (
    <>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />

      <Box width={'100%'} height={'100vh'} display={'flex'}>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"center"} sx={{ width: '50%', background: tema.backgroundMenu }}>
          <div>
            <TaskIcon sx={{ fontSize: 100, color: tema.background, marginTop: 10 }} />
          </div>
        </Box>
        <Box sx={{ width: '50%', backgroundColor: tema.background, }} height={'100vh'}>
          <Button
            onClick={toggleTheme}
            sx={{ my: 2, color: '#ccc', display: 'block', ml: '80%' }}
          >
            {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
          </Button>
          <Box
            component="form"
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            noValidate
            autoComplete="off"
            mt={15}
          >
            <h3>Registrar-se</h3>
            <TextField
              id="outlined-controlled"
              label="UserName"
              color="secondary"
              variant='filled'
              sx={{ m: 2, width: '70%' }}
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
              }}

            />
            <TextField
              id="outlined-controlled"
              label="Email"
              color="secondary"
              variant='filled'
              sx={{ m: 2, width: '70%' }}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}

            />
            <TextField
              id="outlined-controlled"
              label="Senha"
              type='password'
              variant='filled'
              color="secondary"
              sx={{ m: 2, width: '70%' }}
              value={senha}
              onChange={(event) => {
                setSenha(event.target.value);
              }}
              fullWidth
            />
            <Button variant='contained' color="secondary" onClick={handleRegister} sx={{ margin: 2, width: '70%' }}> Registrar</Button>
            <Button variant="outlined" color="secondary" onClick={handleLogin} sx={{ margin: 2, width: '70%' }}>Login</Button>
          </Box>
        </Box>
      </Box>
    </>

  );
}