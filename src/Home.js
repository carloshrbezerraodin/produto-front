
import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useCookies } from 'react-cookie';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [cookies] = useCookies(['XSRF-TOKEN']); // <.>


  const message =
    <h2>Seja Bem vindo controle de produtos</h2> 

  const button = 
    <div>
      <Button color="link"><Link to="/produtos">Produtos</Link></Button>
    </div> 

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        {message}
        {button}
      </Container>
    </div>
  );
}

export default Home;