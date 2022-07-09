import React from 'react';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";import styled from 'styled-components';

export default function TelaProduto () {

    const {type, id} = useParams();
    const [produto, setProduto] = useState({});

    useEffect(() => {

        const URL = `http://localhost:5001/products/id`;

        const config = {
            headers: {
                Id: id
            }
        }
        
        const promise = axios.get(URL, config);
        promise.then((response) => {
            const dados = response.data;
            console.log(response);
            if(dados) {
                setProduto({...dados});
            }
        })

    }, [type]);

    return (
        <Container>
        <div>
            <img src={produto.image} alt="IMG" width="130px" height="170px"/>
            <h2>{produto.product}</h2>
            <h3>{produto.price}</h3>
        </div>
        <Botao>ADICIONAR AO CARRINHO</Botao>
        <div>{produto.quantity}</div>
        <div>{produto.description}</div>
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

const Botao = styled.div`
    width: 85vw;
    height: 7vh;
    background-color: var(--roxo);
    color: var(--branco);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`