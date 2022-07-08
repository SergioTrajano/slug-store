import styled from 'styled-components';
import { AiOutlineTrademarkCircle } from "react-icons/ai";

export default function Footer () {
    return (
        <Container>
            SlugStore
            <AiOutlineTrademarkCircle />
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    height: 10vh;
    background-color: var(--cor-cinza-escuro);
    color: var(--branco)
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;

    svg {
        color: var(--branco);
    }
`