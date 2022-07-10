import React from 'react';
import { Link } from "react-router-dom";


export default function Produto ({ id, product, type, image, price, quantity, description, createdAt }) {

    return(
        <div>
            <Link to={`/${id}`}>
            <img src={image} width="130px" height="170px" alt=""/>
            </Link>
            <h2>{product}</h2>
            <h3>R${parseFloat(price).toFixed(2).replace('.', ',') }</h3>
        </div>
    );
}