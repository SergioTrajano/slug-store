import { FaTimesCircle } from "react-icons/fa";
//import styled from "styled-components"

export default function Item({ item, total }) {
    total += item.preco * item.quantidade;
    console.log(total);

    return (
        <li>
            <div>
                <img src={item.imagem} alt="" />
                <p>{item.produto}</p>
            </div>
            <p>{item.quantidade}</p>
            <div>
                <p>R$ {Number(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                <FaTimesCircle color="var(--vermelho)" style={{width: "2vh", height: "2vh"}}/>
            </div>
        </li>
    );
} 
