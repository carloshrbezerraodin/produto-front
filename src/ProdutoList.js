import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProdutoList = () => {

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['XSRF-TOKEN']);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:8085/produto/listar')
      .then(response => response.json())
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
  }, []);

  const remove = async (produto) => {
    await fetch(`http://localhost:8085/produto/deletar`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(produto),
      mode: 'cors'
    }).then(() => {
      let updatedProdutos = [...produtos].filter(i => i.id !== produto.id);
      setProdutos(updatedProdutos);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const produtoList = produtos.map(produto => {
   
    return <tr key={produto.id}>
      <td style={{ whiteSpace: 'nowrap' }}>{produto.nome}</td>
      <td>{produto.quantidade}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/produto/" + produto.id}>Editar</Button>
          <Button size="sm" color="danger" onClick={() => remove(produto)}>Deletar</Button>
        </ButtonGroup>
      </td>
    </tr>
  });

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/produto/new">Adicinar Produto</Button>
        </div>
        <h3>Produtos</h3>
        <Table className="mt-4">
          <thead>
          <tr>
            <th width="20%">Nome</th>
            <th width="20%">Quantidade</th>
            <th width="10%">Acoes</th>
          </tr>
          </thead>
          <tbody>
          {produtoList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ProdutoList;