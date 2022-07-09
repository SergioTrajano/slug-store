import styled from "styled-components"

export default function Modal ({ display }) {
    return (
        <Container display={display}>
            Modal
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .6);
    display: ${props => props.display};
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: hidden;

`