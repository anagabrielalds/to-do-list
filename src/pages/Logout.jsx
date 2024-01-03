import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/auth";
import { useTheme } from '../context/theme';
import { Box, Avatar, Typography } from "@mui/material";


export default function Logout() {
  const {  Logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(function() {
      Logout();
      navigate("/login");
  }, 5000); //5Segundos
   
  }, [Logout, navigate]);

  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50%', width: '100%'}}>
      <Box>
        <Avatar
          variant='square'
          alt="logout"
          src="https://4.bp.blogspot.com/-mx6A0JdQbqQ/WIH6lf4kcQI/AAAAAAAAYzM/PYYZDSuyfh4UPck8yzw_Te_aIeRVcas0gCLcB/s1600/Gifs%2Banimados%2BCorrendo%2B3.gif"
          sx={{ width: 700, height: 300 }}
        />
      </Box>
      <Box>
        <Typography variant="h5" component="p">
        Saindo...
        </Typography>
      </Box>
      
    </Box>
    </>

  );
}