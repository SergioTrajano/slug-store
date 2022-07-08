import { useContext, useState } from "react";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../../UserContext";

export default function TelaCadastro () {
    const { desabilitarClick, setDesabilitarClick } = useContext(UserContext);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();

    function submeter(e) {
        e.preventDefault();
        setDesabilitarClick(true);

        if (senha !== confirmarSenha) {
            alert('As senhas devem coincidir!');
            setSenha('');
            setConfirmarSenha('');
            setDesabilitarClick(false);
            return;
        }

        const dadosParaCadastrar = {
            nome,
            email,
            senha,
        };
        const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth`, dadosParaCadastrar);
        promise.then(() => {
            alert('Cadastro realizado! Você já podefazer login.');
            setDesabilitarClick(false);
            navigate('/sign-in');
        });
        promise.catch(() => {
            alert('Dados invalidos!');
            setDesabilitarClick(false);
        });
    }

    const butaoConteudo = !desabilitarClick ? 'CADASTRAR' : <ThreeDots color='white' />;

    return (
        <Container>
            <p>
                Insira seus dados
            </p>
            <form onSubmit={submeter}>
            <input 
                    placeholder='Nome'
                    type={'text'}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled={desabilitarClick}
                    required
                />
                <input 
                    placeholder='E-mail'
                    type={'email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={desabilitarClick}
                    required
                />
                <input 
                    placeholder='Senha'
                    type={'password'}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    minLength={8}
                    maxLength={18}
                    disabled={desabilitarClick}
                    required
                />
                <input 
                    placeholder='Confirmar senha'
                    type={'password'}
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    disabled={desabilitarClick}
                    required
                />
                <button disabled={desabilitarClick} type={'submit'}>
                    {butaoConteudo}
                </button>
            </form>
            <Link to={'/sign-in'} style={{pointerEvents: desabilitarClick ? 'none' : 'initial'}}>
                Já tem conta? Faça login!
            </Link>
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    min-height: 80vh;
    position: absolute;
    top: 10vh;
    left: 0;
    background-color: var(--branco);
    font-family: 'Inter', sans-serif;
    color: var(--preto);
    display: flex;
    flex-direction: column;
    align-items: center;


    p {
        font-size: 4.79vh;
        line-height: 5.24vh;
        color: var(--preto);
        font-weight: bold;
        margin-top: 7vh;
        margin-bottom: 4.49vh;
        align-self: center;
        width: 60vw;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            width: 86.93vw;
            height: 8.69vh;
            background-color: var(--branco);
            color: var(--preto);
            font-size: 2.99vh;
            line-height: 3.52vh;
            padding-left: 4vw;
            margin-bottom: 2.24vh;
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
            display: flex;
            justify-content: center;
            align-items: center;

            &:disabled {
                opacity: 0.8;
            }
        }
    }

    a {
        text-decoration: none;
        font-size: 2.24vh;
        line-height: 2.63vh;
        font-weight: bold;
        color: var(--preto);
        margin-top: 3vh;
        width: 60vw;
        text-align: center;

        &:disabled {
            opacity: 0.8;
        }
    }
`