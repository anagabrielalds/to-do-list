import * as React from 'react';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import ResponseMessage from './ResponseMessage';
import * as api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';


export default function PasswordRecoverySteps() {

  const handleSubmitNewPassword = async () => {
    let response = await api.passwordRecovery(email);
    if (parseInt(response.status) === 200) {
      setResponseRequest({ open: true, status: 'success', message: response.message });

      setStepCurrent(1);
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
  }

  const handleLoginWithMailAndPasswordRecovery = async () => {
    var model = {"Mail": email, "Password" : senha};

    let response = await AuthenticateWithMailAndPasswordRecovery(model);

    if (parseInt(response.status) === 200) {
      setResponseRequest({ open: true, status: 'success', message: response.message });

      setTimeout(() => { return navigate("/"); }, 3000);
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
  }

  const { AuthenticateWithMailAndPasswordRecovery} = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const [headers] = React.useState(['Vamos enviar a recuperação de senha por e-mail.', 'Fazer login com a senha recebida no e-mail']);
  const [textButton] = React.useState(['Enviar', 'Entrar']);
  
  const [stepCurrent, setStepCurrent] = React.useState(0);

  const [responseRequest, setResponseRequest] = React.useState({ open: false, status: 'error', message: 'Preencha o usuário e senha' });
 
  return (
    <>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />

      <Box width={'100%'} flexDirection={'column'} display={'flex'} alignItems={'center'} >
        <h3> {headers[stepCurrent]}</h3>
        <TextField
          id="email"
          label="E-mail"
          variant='filled'
          sx={{ m: 2, width: '70%' }}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        /> 
        
        <TextField
          id="senhaAtual"
          label="Senha"
          type='password'
          variant='filled'
          sx={{ m: 2, width: '70%', display: (stepCurrent === 1 ) ? 'block' : 'none' }}
          value={senha}
          onChange={(event) => {
            setSenha(event.target.value);
          }}
        />

        <Button variant='contained' onClick={() => (stepCurrent === 0) ? handleSubmitNewPassword() : handleLoginWithMailAndPasswordRecovery() } sx={{ margin: 2, width: '70%' }}> {textButton[stepCurrent]}</Button>
      </Box>
    </>
  );
}

