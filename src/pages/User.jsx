import * as React from 'react';
import * as api from '../services/api';

import ResponseMessage from "../components/ResponseMessage";

import { Avatar, Box, Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useAuth } from '../context/auth';

export default function User() {
  const [isEditing, setIsEditing] = React.useState(false);
  const {user, setUser} = useAuth();
  const [userInfo, setUserInfo] = React.useState(user);

  const [responseRequest, setResponseRequest] = React.useState({ open: false, status: 'error', message: 'Preencha o usuário e senha' });

  const handleInputChange = (event, field) => {
    const updatedData = { ...userInfo, [field]: event.target.value };
    console.log(updatedData);
    setUserInfo(updatedData);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedItem = {
      "username": userInfo.username,
      "mail": userInfo.mail,
      "imagePath": userInfo.imagePath
    }

    updateUser(updatedItem);
  };
  
  async function updateUser(data) {

    let response = await api.updateUser(data);

    if (parseInt(response.status) === 200) {

      setResponseRequest({ open: true, status: 'success', message: response.message });
      setIsEditing(false);

      // const updatedUser = {
      //   ...user,
      //   username: response.data.username,
      //   image: response.data.imagePath,
      //   email: response.data.mail
      // };
      setUser(response.data);

      sessionStorage.setItem('@App:user', JSON.stringify(response.data));
    }
    else {
      setResponseRequest({ open: true, status: 'error', message: response.message });
    }
  };


  return (
    <>
      <ResponseMessage open={responseRequest.open} setOpen={setResponseRequest} message={responseRequest.message} status={responseRequest.status} />
      
      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
 
      
        <Box sx={{ width: '50%' }} >
        
        <h3 style={{textAlign: 'center', margin: '50px 0'}}> Informações de Usuário</h3>


          <Box
            component="form"
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            noValidate
            autoComplete="true"
            mt={5}
          >
            <Avatar alt="User Avatar" src={userInfo.imagePath} sx={{ width: 100, height: 100 }} />

            <TextField
              label="UserName"
              variant='filled'
              sx={{ m: 2, width: '70%' }}
              value={userInfo.username || ''}
              onChange={(e) => handleInputChange(e, 'username')}
              InputProps={{ readOnly: !isEditing }}

            />
            <TextField
              label="Email"
              type='email'
              variant='filled'
              sx={{ m: 2, width: '70%' }}
              value={userInfo.mail || ''}
              onChange={(e) => handleInputChange(e, 'mail')}
              InputProps={{ readOnly: !isEditing }}
              fullWidth
            />

            { isEditing ?
             <TextField
              label="Imagem"
              type='text'
              variant='filled'
              sx={{ m: 2, width: '70%' }}
              value={userInfo.imagePath || ''}
              onChange={(e) => handleInputChange(e, 'imagePath')}
              InputProps={{ readOnly: !isEditing }}
              fullWidth
            />
            : ""}

          {isEditing && (
            <Box display={'flex'} flexDirection={'column'} width={"70%"} height={"10%"} >
              <Button variant="contained" color="primary" onClick={handleSaveClick}>
                Salvar
              </Button>
            </Box>
          )}

          {!isEditing && (
            <Box display={'flex'} flexDirection={'column'} width={"70%"} height={"10%"} >
              <Button variant="contained" color="secondary" onClick={handleEditClick}  sx={{marginBottom: 3, marginTop: 3}}>
                Editar Informações
              </Button>

              <Button variant="contained" color="primary" href='/resetPassword' sx={{marginBottom: 3, marginTop: 3}}>
                Alterar Senha
              </Button>
            </Box>
          )}

          </Box>
        </Box>
      </Box>
    </>

  );
}