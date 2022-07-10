import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import fundoLesmas from "../../assets/img/img-fundo-lesmas.jpeg";
import fundoAtiradores from "../../assets/img/img-fundo-atiradores.jpeg"; 
import fundoCarros from "../../assets/img/img-fundo-carros.jpeg"; 


export default function Home () {
    return (
        <Container>
        <div>
            <h1>Lesmas</h1>
            <Link to="/lesma">
            <img src={fundoLesmas} width="100%" height="100%" alt="IMG"/>
            </Link>
        </div>
        <div>
            <h1>Atiradores</h1>
            <Link to="/atirador">
            <img src={fundoAtiradores} width="100%" height="100%" alt="IMG"/>
            </Link>
        </div>
        <div>
            <h1>Carros</h1>
            <Link to="/carro">
            <img src={fundoCarros} width="100%" height="100%" alt="IMG"/>
            </Link>
        </div>
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

    div { 
        width: 85vw;
        height: 22vh;
        overflow: hidden;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    h1 {
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 5px;
    }

    img {
        object-fit: cover;
    }
`