import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import { AuthProvider, useAuth } from "./context/auth";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import { useTheme } from "./context/theme";
import Register from "./pages/Register";
import { TarefasProvider } from "./context/tabela";

const PrivateRoute = () => {
  const { signed } = useAuth();
  return signed  ? <TarefasProvider><Outlet /></TarefasProvider> : <Navigate to="/login" />;
};

function App() {
  const { tema } = useTheme();
  return (
    <AuthProvider>
        <div
          style={{
            background: tema.background,
            color: tema.fonte,
            width: "100vw",
            height: "100vh",
          }}
        >
        
          <Router>
          {/* <MenuApp /> */}
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Tasks />} />
                <Route path="categoria" element={<h1>categorias</h1>} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="logout" element={<h1>SingOut</h1>} />
              <Route path="*" element={<h1>NotFound</h1>} />
            </Routes>
          </Router>
        </div>
    </AuthProvider>
  );
}

export default App;
