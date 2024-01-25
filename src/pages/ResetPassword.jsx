import * as React from 'react';
import { Box, Button, Menu } from '@mui/material';
import TextField from '@mui/material/TextField';
import ResponseMessage from '../components/ResponseMessage';
import * as api from '../services/api';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';


export default function ResetPassword() {
  const navigate = useNavigate();

  const [novaSenha, setNovaSenha] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [responseRequest, setResponseRequest] = React.useState({ open: false, status: 'error', message: 'Preencha o usuário e senha' });
 

  async function handleResetPassword  () {
    var model = {"PasswordOld": senha, "PasswordNew": novaSenha};
    let response = await api.resetPassword(model);

    if (parseInt(response.status) === 200) {
      setResponseRequest({ open: true, status: 'success', message: response.message });
      
      setTimeout(() => { return navigate("/logout"); }, 5000);
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
    
  }

  return (
 
    <>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />

      <Box width={'100%'} flexDirection={'column'} display={'flex'} alignItems={'center'} >
        <h3> Como você fez a recuperação de senha recomendamos que você faça a redefinição agora</h3>
        
        <TextField
          id="senhaAtual"
          label="Senha Recuperada"
          type='password'
          variant='filled'
          sx={{ m: 2, width: '70%'}}
          value={senha}
          onChange={(event) => {
            setSenha(event.target.value);
          }}
        />

        <TextField
          id="email"
          label="Nova Senha"
          variant='filled'
          type='password'
          sx={{ m: 2, width: '70%' }}
          value={novaSenha}
          onChange={(event) => {
            setNovaSenha(event.target.value);
          }}
        /> 

        <Button variant='contained' onClick={handleResetPassword } sx={{ margin: 2, width: '70%' }}> Alterar</Button>
      </Box>
    </>
  );
}

