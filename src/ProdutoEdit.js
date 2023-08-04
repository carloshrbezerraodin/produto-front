import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { useCookies } from 'react-cookie';

const ProdutoEdit = () => {
  const initialFormState = {
    nome: '',
    quantidade: '',
  };
  const [produto, setProduto] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies(['XSRF-TOKEN']);

  useEffect(() => {
    if (id !== 'new') {
      fetch(`http://localhost:8085/produto/buscar/${id}`,{ mode: 'cors' })
        .then(response => response.json())
        .then(data => setProduto(data));
    }
  }, [id, setProduto]);

  const handleChange = (event) => {
    const { name, value } = event.target

    setProduto({ ...produto, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (produto.id) {
        await fetch(`http://localhost:8085/produto/atualizar`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto),
            mode: 'cors'
            
        });
    } else {
        await fetch(`http://localhost:8085/produto/salvar`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto),
            mode: 'cors'
        });
    }


    setProduto(initialFormState);
    navigate('/produtos');
  }

  const title = <h2>{produto.id ? 'Editar Produto' : 'Adicionar Produto'}</h2>;

  return (<div>
      <AppNavbar/>
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="nome">Nome</Label>
            <Input type="text" name="nome" id="nome" value={produto.nome || ''}
                   onChange={handleChange} autoComplete="nome"/>
          </FormGroup>
          <FormGroup>
            <Label for="quantidade">Quantidade</Label>
            <Input type="text" name="quantidade" id="quantidade" value={produto.quantidade || ''}
                   onChange={handleChange} autoComplete="quantidade"/>
          </FormGroup>
          
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/produtos">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};

export default ProdutoEdit;