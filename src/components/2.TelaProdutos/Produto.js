import React from 'react';


export default function Produto ({ product, type, image, price, quantity, description, createdAt }) {

    return(
        <div>
            <img src={image}/>
            <h2>{product}</h2>
            <h3>{price}</h3>
        </div>
    );
}