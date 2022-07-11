import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";import styled from 'styled-components';
import UserContext from '../../UserContext';
import { useNavigate } from "react-router-dom";

export default function TelaProduto () {

    const { id } = useParams();
    const [produto, setProduto] = useState({});

    const { token, carrinho, setCarrinho } = useContext(UserContext);
    const navigate = useNavigate();
    require('dotenv').config({ path: '../../.env' })

    useEffect(() => {


        const URL = `${process.env.REACT_APP_API_BASE_URL}/products/id`;

        const config = {
            headers: {
                Id: id
            }
        }
        
        const promise = axios.get(URL, config);
        promise.then((response) => {
            const dados = response.data;
            if(dados) {
                setProduto({...dados});
            }
        })

    }, []);

    function adicionarAoCarrinho() {
    if(produto.quantity <=0) {
        alert("produto fora de estoque");
        return;
    }

        if(!token) { 
            setCarrinho([...carrinho, produto]);
            alert("Produto adicionado ao carrinho!");
            navigate(-1);
        } else { 

        const produtoAdicionado = {
            product: produto.product,
            type: produto.type,
            image: produto.image,
            price: produto.price,
            description: produto.description,
            quantity: produto.quantity,
            createdAt: produto.createdAt,
            produtoId: produto._id,
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
       

        const promise = axios.put(`${process.env.REACT_APP_API_BASE_URL}/cart/add`, produtoAdicionado, config);
        promise.then(res => {
            setCarrinho(res.data);
            alert("Produto adicionado ao carrinho!");
        });
            promise.catch(() => {
               alert("Problemas para adicionar produto ao carrinho. Tente mais tarde, por favor.")
            });
        }
    }

    return (
        <Container>
            <div>
                <img src={produto.image} alt="IMG" width="130px" height="170px"/>
                <h2>{produto.product}</h2>
                <h3>R$ {parseFloat(produto.price).toFixed(2)}</h3>
            </div>
            <Botao onClick={ adicionarAoCarrinho }>
            {produto.quantity >0 ? "ADICIONAR AO CARRINHO" : "PRODUTO INDISPONÍVEL"}
            </Botao>
            <Estoque>{ produto.quantity > 0 ? 
            `Apenas ${produto.quantity} unidades disponíveis!` : 
            `Produto em falta no estoque :/`}</Estoque>
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