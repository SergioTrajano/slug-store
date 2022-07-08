import React from 'react';
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';


export default function TelaProdutos () {
    const {type} = useParams();
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
    
        const URL = `http://localhost:5000/products`;

        const config = {
            headers: {
                Type: {type}
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

    }, []);

    return (
        <Container>
        <Menu>
            <Link to="/lesma"><div>Lesmas</div></Link>
            <Link to="/atirador"><div>Atiradore</div></Link>
            <Link to="/carro"><div>Carros</div></Link>
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
            : <p>No momento não há nenhum produto dessa categoria no nosso estoque :/</p>}

        </Display>


        </Container>
    )
};