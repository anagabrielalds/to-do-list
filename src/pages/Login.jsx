import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { Navigate, useNavigate } from 'react-router-dom';


const Logar= () => {
  const { signed, Login } = useAuth();
  const [msgmError, setMsgmError] = useState();
  const navigate = useNavigate();

  async function handleLogin() {
    await Login({
      email: 'rafaelcodomingues@gmail.com',
      password: '123456',
    });
    
    navigate("/");
  }

  return (
    <div>
      <h1>{msgmError}</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Logar;