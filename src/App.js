import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Routes } from 'react-router-dom';
import Tasks from './components/Tasks';
import MenuApp from './components/MenuApp';
 
function App() {
  return (
    <Router>
      <MenuApp />
      <Routes>
        <Route exact path='/' element={<Tasks />} />
      </Routes>
    </Router>
  );
}
 
export default App;
 