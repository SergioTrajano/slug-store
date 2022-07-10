import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import UserContext from "../../UserContext.js";
import Item from "./Item.js";
import Modal from "./Modal.js";

export default function TelaCarrinho () {
    const { token, carrinho, desabilitarClick, setRotaAnterior} = useContext(UserContext);
    let total = 0;
    const [modalDisplay, setModalDisplay] = useState("none");
    const navigate = useNavigate();

    function itensDoCarrinho() {
        if (carrinho.length) {
            carrinho.forEach(element => {
                total += Number(element.price * element.quantity);
            });
            return <><ul>{carrinho.map((item,i) => <Item key={i} item={item} />)}</ul>
            <span>Total: R$ {Number(total).toFixed(2).replace('.', ',')}</span></>;
        }
        return <div>Seu carrinho está vazio</div>;
    }

    function comprar() {
        if (token) {
            setModalDisplay("flex");
        } else {
            alert("Faça login para continuar.");
            setRotaAnterior("cart");
            navigate("/sign-in");
        }
    }

    const listaDeCompras = itensDoCarrinho();
    const conteudoButao = !desabilitarClick ? "COMPRAR" : <ThreeDots color="white" />;
    
    return (
        <>
            <Container>
                <p>
                    Seu carrinho
                </p>

                {listaDeCompras}
                
                <button disabled={desabilitarClick} onClick={comprar} >{conteudoButao}</button>
            </Container>
            <Modal display={modalDisplay} setDisplay={setModalDisplay}/>
        </>
    )
};

const Container = styled.div`
    margin: 10vh 0;
    width: 100vw;
    min-height: 80vh;
    background-color: var(--branco);
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 500;

    >p {
        font-size: 4.79vh;
        line-height: 5.24vh;
        color: var(--preto);
        font-weight: bold;
        margin-top: 4vh;
        margin-bottom: 4.49vh;
        align-self: center;
        width: 60vw;
        text-align: center;
    }

    span {
        width: 80vw;
        display: flex;
        justify-content: end;
        font-size: 3.5vh;
    }

    >div {
            width: 90vw;
            height: 50vh;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid var(--roxo);
            font-size: 4.5vh;
            color: var(--preto);
            text-align: center;
    }

    ul {
        min-height: 60vh;

        li {
            width: 90vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid var(--roxo);
            padding: 0.5vh 1vw;
            margin-bottom: 2vh;

            img {
                width: 10vw;
                height: 10vw;
            }

            p {
                font-size: 3vh;
                color: var(--preto);
            }

            div {
                display: flex;
                align-items: center;
                margin-bottom: 0;
            }

            div:first-child p {
                margin-left: 3vw;
            }

            div:last-child p {
                margin-right: 3vw;
            }
        }
    }

    >button {
            width: 86.93vw;
            height: 6.89vh;
            text-align: center;
            border: none;
            background-color: var(--roxo);
            color: var(--branco);
            font-size: 2.99vh;
            line-height: 3.52vh;
            font-weight: bold;
            border-radius: 5px;
            margin-top: 3vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 3vh;

            &:disabled {
                opacity: 0.8;
            }
        }

`