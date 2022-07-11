import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import UserContext from '../../UserContext';

export default function TelaLogin () {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { setToken, setNome, rotaAnterior, desabilitarClick, setDesabilitarClick, carrinho, setCarrinho } = useContext(UserContext);
    const navigate = useNavigate();

    function submeter(e) {
        e.preventDefault();
        setDesabilitarClick(true);
        const dadosLogin = {
            headers: {
                email,
                senha,
            }
        }
        const promiseSignIn = axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth`, dadosLogin);
        promiseSignIn.then((response) => {
            setToken(response.data.token);
            setNome(response.data.nome);
            setDesabilitarClick(false);

            const config = {
                headers: {
                    Authorization: `Bearer ${response.data.token}`,
                }
            };
            
            const promiseCarrinho = axios.put(`${process.env.REACT_APP_API_BASE_URL}/cart`, carrinho, config);
            promiseCarrinho.then( response => {
                setCarrinho([...response.data]);
                navigate(`/${rotaAnterior}`);
            })
            promiseCarrinho.catch(() => {
                alert("Erro no servidor. Por favor tente mais tarde!");
            })
            
        });
        promiseSignIn.catch(() => {
            alert('Dados inválidos!');
            setDesabilitarClick(false);
            setEmail('');
            setSenha('');
        });
    }

    const butaoConteudo = !desabilitarClick ? 'FAZER LOGIN' : <ThreeDots color='white' />;

    return (
        <Container>
            <p>
                Seja muito bem vindo(a)!
            </p>
            <form onSubmit={submeter}>
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
                    disabled={desabilitarClick}
                    required
                />
                <button disabled={desabilitarClick} type={'submit'}>
                    {butaoConteudo}
                </button>
            </form>
            <Link to={'/sign-up'} style={{pointerEvents: desabilitarClick ? 'none' : 'initial'}}>
                Não tem cadastro ainda? Cadastre-se agora!
            </Link>
        </Container>
    );
}

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
            margin-top: 3vh;
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
        margin-top: 5.39vh;
        width: 60vw;
        text-align: center;

        &:disabled {
            opacity: 0.8;
        }
    }
`