import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProdutoList from './ProdutoList';
import ProdutoEdit from './ProdutoEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/produtos" exact={true} element={<ProdutoList/>}/>
        <Route path="/produto/:id" exact={true} element={<ProdutoEdit/>}/>
      </Routes>
    </Router>
  );
}

export default App;