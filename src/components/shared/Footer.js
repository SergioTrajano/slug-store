import styled from 'styled-components';

export default function Footer () {
    return (
        <Container>
            Footer
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    height: 10vh;
    background-color: var(--cor-cinza-escuro);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
`