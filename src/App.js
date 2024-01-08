import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import { AuthProvider, useAuth } from "./context/auth";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import { TarefasProvider } from "./context/tabela";
import Categories from "./pages/Categories";
import MenuApp from "./components/MenuApp";

const PrivateRoute = () => {
  const { signed } = useAuth();
  return signed ? (
    <TarefasProvider>
      <MenuApp />
      <Outlet />
    </TarefasProvider>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <AuthProvider>
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <Router>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Tasks />} />
              <Route path="category" element={<Categories />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route path="*" element={<h1>NotFound</h1>} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
