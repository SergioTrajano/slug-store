import { useContext, useState } from "react"
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import axios from "axios";

import UserContext from "../../UserContext";

export default function Modal ({ display, setDisplay, total }) {
    const { token, carrinho, setCarrinho, desabilitarClick, setDesabilitarClick} = useContext(UserContext);
    const [cartaoTipo, setCartaoTipo] = useState("");
    const [cartaoNumero, setCartaoNumero] = useState("");
    const [cartaoCodigo, setCartaoCodigo] = useState("");
    const [cartaoValidade, setCartaoValidade]= useState("");

    function submeter(e) {
        e.preventDefault();
        setDesabilitarClick(true);
        const pedido = {
            itens: carrinho,
            valor: total,
            formaPagamento: cartaoTipo,
            paymentData: {
                numero: cartaoNumero,
                codigo: cartaoCodigo,
                validade: cartaoValidade
            },
        };
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const promisePedido = axios.post(`${process.env.REACT_APP_API_BASE_URL}/order`, pedido, config);
        promisePedido.then(() => {
            const promiseProduto = axios.put(`${process.env.REACT_APP_API_BASE_URL}/products`, [], config);
            promiseProduto.then(() => {
                const promiseCarrinho = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart`, config);
                promiseCarrinho.then(() => {
                    alert("Compra realizada!");
                    setCarrinho([]);
                    setDisplay("none");
                });
                promiseCarrinho.catch(() => {
                    alert("Ocorreu algum erro. Tente novamente mais tarde!");
                });
            });
            promiseProduto.then(() => {
                alert("Ocorreu algum erro. Tente novamente mais tarde!");
            });
        });
        promisePedido.catch(() => {
            alert("Ocorreu algum erro. Tente novamente mais tarde!");
        });
        setDesabilitarClick(false);
    }

    function resetarDadosCartao() {
        setCartaoTipo("");
        setCartaoNumero("");
        setCartaoCodigo("");
        setCartaoValidade("");
        setDisplay("none");
    }
    
    const butaoCOnteudo = !desabilitarClick ? "REALIZAR PAGAMENTO" : <ThreeDots color="white" />;

    return (
        <Container kdisplay={display}>
            <Modelo>
                <p>
                    Dados do pagamento
                </p>
                <form onSubmit={submeter}>
                    <div>
                        <div onClick={() => setCartaoTipo("crédito")} style={{backgroundColor: cartaoTipo === "crédito" ? "green" : "var(--cor-cinza-escuro)"}}>Cartão de Crédito</div>
                        <div onClick={() => setCartaoTipo("débito")} style={{backgroundColor: cartaoTipo === "débito" ? "green" : "var(--cor-cinza-escuro)"}}>Cartão de Débito</div>
                    </div>
                    <input 
                        placeholder="Número do Cartão"
                        type={'text'}
                        value={cartaoNumero}
                        onChange={(e) => setCartaoNumero(e.target.value)}
                        minLength={16}
                        maxLength={16}
                        disabled={desabilitarClick}
                        required
                    />
                    <input 
                        placeholder="Código do Cartão"
                        type={'text'}
                        value={cartaoCodigo}
                        onChange={(e) => setCartaoCodigo(e.target.value)}
                        minLength={3}
                        maxLength={3}
                        disabled={desabilitarClick}
                        required
                    />
                    <input 
                        placeholder="Data de Validade"
                        type={'text'}
                        value={cartaoValidade}
                        onChange={(e) => setCartaoValidade(e.target.value)}
                        disabled={desabilitarClick}
                        required
                    />
                    <button type="submit" disabled={desabilitarClick || !cartaoTipo} >{butaoCOnteudo}</button>
                </form>
                <button onClick={resetarDadosCartao}>VOLTAR</button>
            </Modelo>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
    display: ${props => props.kdisplay};
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
`

const Modelo = styled.div`
    width: 80vw;
    height: 60vh;
    background-color: var(--cinza-claro);
    color: var(--preto);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;

    p {
        font-size: 3vh;
        line-height: 3.5vh;
        color: var(--preto);
        font-weight: bold;
        margin-top: 5vh;
        margin-bottom:5vh;
        align-self: center;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        >div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 60vw;
            margin-bottom: 5vh;

            div {
                width: 25vw;
                border: 1px solid var(--roxo);
                padding: 2px;
                font-size: 2vh;
                border-radius: 5px;
                color: var(--branco);
                text-align: center;
                border: none;
            }

        }

        input {
            width: 60vw;
            height: 6vh;
            background-color: var(--branco);
            color: var(--preto);
            font-size: 1.5vh;
            line-height: 1.75vh;
            padding-left: 2vw;
            margin-bottom: 2.5vh;
            border-radius: 5px;
            border: 1px solid var(--cinza-claro);

            &::placeholder {
                color: var(--cor-cinza-escuro);
            }

            &:disabled {
                opacity: 0.8;
            }
        }

        button {
            width: 43.46vw;
            height: 3.44vh;
            text-align: center;
            border: none;
            background-color: var(--roxo);
            color: var(--branco);
            font-size: 1.5vh;
            line-height: 1.75vh;
            font-weight: bold;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:disabled {
                opacity: 0.8;
            }
        }
    }

    >button {
        width: 43.46vw;
        height: 3.44vh;
        text-align: center;
        border: none;
        background-color: var(--cinza-claro);
        color: var(--roxo);
        font-size: 1.5vh;
        line-height: 1.75vh;
        font-weight: bold;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`