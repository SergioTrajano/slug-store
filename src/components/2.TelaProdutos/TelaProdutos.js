import React from 'react';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import Produto from './Produto';


export default function TelaProdutos () {
    const {type} = useParams();
    const [produtos, setProdutos] = useState([]);
    require('dotenv').config({ path: '../../.env' })

    useEffect(() => {
        setProdutos([]);

        const URL = `${process.env.REACT_APP_API_BASE_URL}/products`;

        const config = {
            headers: {
                Type: type
            }
        }
        
        const promise = axios.get(URL, config);
        promise.then((response) => {
            const dados = response.data;
            console.log(response);
            if(dados.length !==0) {
                setProdutos([...dados]);
            }
        })

    }, [type]);

    return (
        <Container>
        <Menu>
            <Link style={{textDecoration: 'none'}} to="/lesma"><div>Lesmas</div></Link>
            <Link style={{textDecoration: 'none'}} to="/atirador"><div>Atiradores</div></Link>
            <Link style={{textDecoration: 'none'}} to="/carro"><div>Carros</div></Link>
        </Menu>
        <Display>
        {produtos.length ? produtos.map( produto => { return <Produto key={produto._id}
                                                                id={produto._id}
                                                                product={produto.product} 
                                                                type={produto.type}
                                                                image={produto.image}
                                                                price={produto.price}
                                                                description={produto.description} 
                                                                quantity={produto.quantity}
                                                                createdAt={produto.createdAt}/>})
            : <p>No momento não há nenhum produto desta categoria no nosso estoque :/</p>}

        </Display>
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding-top: 10px;
    background-color: var(--branco);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Menu = styled.div`
    width: 90vw;
    height: 8vh;
    padding-top: 6px;
    padding-bottom: 6px;
    margin-top: 85px;
    margin-bottom: 20px;
    background-color: var(--cinza-claro);
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: var(--roxo);
    font-size: 18px;
`

const Display = styled.div`
    width: 85vw;
    height: 100vh;
    padding-top: 10px;
    padding-bottom: 120px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    overflow: scroll;
    color: var(--preto);
    font-size: 18px;

    div {
        width: 150px;
        margin-bottom: 8px;
        text-align: center;
    }

    img {
        margin-bottom: 5px;
    }

    h2 {
        margin-bottom: 4px;
        font-size: 16px;
    }

    h3 {
        margin-bottom: 4px;
        font-size: 15px;
        font-weight: 600;
    }
`