import styled from 'styled-components';

export default function Header () {
    return (
        <Container>
            Header
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 10vh;
    background-color: var(--cor-cinza-escuro);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
`