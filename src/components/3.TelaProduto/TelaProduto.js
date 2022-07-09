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

    }, []);

    return (
        <Container>
            <div>
                <img src={produto.image} alt="IMG" width="130px" height="170px"/>
                <h2>{produto.product}</h2>
                <h3>R$ {parseFloat(produto.price).toFixed(2)}</h3>
            </div>
            <Botao>ADICIONAR AO CARRINHO</Botao>
            <Estoque>Apenas {produto.quantity} unidades disponíveis!</Estoque>
            <Descricao>{produto.description}</Descricao>
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    height: auto;
    padding-top: 100px;
    padding-bottom: 100px;
    background-color: var(--branco);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    img {
        object-fit: cover;
    }

    h2 {
        font-size: 20px;
        text-align: center;
        padding-top: 10px;
    }

    h3 {
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        padding-top: 10px;
        margin-bottom: 20px;
    }
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
const Estoque = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 20px;

`
const Descricao = styled.div`
    font-size: 18px;
    text-align: left;
    padding-left: 30px;
    padding-right:30px;
    line-height: 25px;
`