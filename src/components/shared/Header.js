import styled from 'styled-components';
import { BsFillPersonFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";

import UserContext from '../../UserContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

export default function Header () {
    const { nome, carrinho, desabilitarClick, setRotaAnterior } = useContext(UserContext);

    const nomeUsuarioLogado = nome.split(' ')[0] || '';
    const iconeCor = nome ? 'var(--roxo)' : 'var(--cor-cinza-escuro)';
    const quantidadeItensNoCarrinho = carrinho.length;

    function salvarRota() {
        if (!nome) {
            const urlAtual = window.location.href.split('/');
            let rotaAtual = "";
            urlAtual.forEach((elem,i) => {
                if (i > 2) rotaAtual += elem;
                if (i < urlAtual.length-1) rotaAtual += "/";
            });

            if (rotaAtual !== "sign-up" && rotaAtual !== "sign-in") setRotaAnterior(rotaAtual);
        }
    }

    return (
        <Container>
            <Link to={'/'}>
                SlugStore
            </Link>
            <div>
                <Link to={'/sign-in'} onClick={salvarRota} style={{pointerEvents: (nome || desabilitarClick)  ? 'none' : 'initial'}}>
                    <BsFillPersonFill style={{width: '6vh', height: '6vh'}} color={iconeCor}/>
                    <span>{nomeUsuarioLogado}</span>
                </Link>
                <Link to={'/cart'} style={{pointerEvents: desabilitarClick ? 'none' : 'initial'}}>
                    <FaShoppingCart style={{width: '6vh', height: '6vh'}} color='var(--roxo)'/>
                    <div>
                        {quantidadeItensNoCarrinho}
                    </div>
                </Link>
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 10vh;
    background-color: var(--amarelo);
    display: flex;
    justify-content: space-between;
    padding: 0 3vw;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    a {
        text-decoration: none;
    }

    >a {
        font-family: 'Bangers', cursive;
        font-size: 5.99vh;
        line-height: 6.1vh;
        color: var(--vermelho);
    }

    div {
        display: flex;
        align-items: center;
        
        a {
            font-size: 2.24vh;
            line-height: 2.3vh;
            text-decoration: none;
            display: flex;
            align-items: center;
        }

        a:first-child {
            max-width: 14vw;
            flex-direction: column;

            span {
                max-width: inherit;
                text-overflow: ellipsis;
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            
        }

        a:last-child {
            margin-left: 3vw;

            div {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 3vh;
                height: 3vh;
                border-radius: 50%;
                background-color: var(--branco);
                margin-left: 1vw;
                color: var(--preto);
            }
        }
    }
`