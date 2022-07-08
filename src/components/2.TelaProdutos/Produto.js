import React from 'react';


export default function Produto ({ id, product, type, image, price, quantity, description, createdAt }) {

    return(
        <div>
            <Link to={`/${id}`}>
            <img src={image}/>
            </Link>
            <h2>{product}</h2>
            <h3>{price}</h3>
        </div>
    );
}