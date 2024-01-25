import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useTheme } from '../context/theme';

import ResponseMessage from "../components/ResponseMessage";

import { Box, Button, Divider } from "@mui/material";
import TaskIcon from '@mui/icons-material/TaskAlt';
import PasswordRecoverySteps from '../components/PasswordRecoverySteps';

export default function PasswordRecovery(){
  const { IconMode, toggleTheme } = useTheme();
  const [responseRequest, setResponseRequest] = React.useState({ open: false, status: 'error', message: 'Não foi possível recuperar a senha' });
 
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

        <h1 style={{textAlign: 'center'}}>Recuperação de senha</h1>

        <Divider sx={{margin: '50px auto', width: '80%'}}/>

        <PasswordRecoverySteps />

      </Box>
    </Box>
  </>
  )
}