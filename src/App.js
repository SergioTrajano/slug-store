import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import UserContext from "./UserContext";
import Modal from "./components/shared/Modal.js";
import TelaHome from "./components/1.TelaHome/TelaHome.js";
import TelaProdutos from "./components/2.TelaProdutos/TelaProdutos.js";
import TelaProduto from "./components/3.TelaProduto/TelaProduto.js";
import TelaCadastro from "./components/4.TelaCadastro/TelaCadastro.js";
import TelaLogin from "./components/5.TelaLogin/TelaLogin.js";
import TelaCarrinho from "./components/6.TelaCarrinho/TelaCarrinho.js";


export default function App() {

    const [token, setToken] = useState("");
    const [nome, setNome] = useState("");
    const [carrinho, setCarrinho] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    

    const contextValue = { token, setToken,
                            nome, setNome,
                            carrinho, setCarrinho,
                            modalIsOpen, setIsOpen };

    return (

        <UserContext.Provider value={contextValue}>
        <BrowserRouter>
                {modalIsOpen ? <Modal/> : null} 
            <Routes>
                <Route path="/" element={<TelaHome />} />
                <Route path="/:type" element={<TelaProdutos />} />
                <Route path="/:type/:id" element={<TelaProduto />} />
                <Route path="/sign-up" element={<TelaCadastro />} />
                <Route path="/sign-in" element={<TelaLogin />} />
                <Route path="/cart" element={<TelaCarrinho />} />
            </Routes>
        </BrowserRouter>
        </UserContext.Provider>

    );
}