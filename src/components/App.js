import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import UserContext from "../UserContext";
import Header from "./shared/Header.js";
import Footer from "./shared/Footer.js";
import TelaHome from "./1.TelaHome/TelaHome.js";
import TelaProdutos from "./2.TelaProdutos/TelaProdutos.js";
import TelaProduto from "./3.TelaProduto/TelaProduto.js";
import TelaCadastro from "./4.TelaCadastro/TelaCadastro.js";
import TelaLogin from "./5.TelaLogin/TelaLogin.js";
import TelaCarrinho from "./6.TelaCarrinho/TelaCarrinho.js";


export default function App() {

    const [token, setToken] = useState("");
    const [nome, setNome] = useState("");
    const [carrinho, setCarrinho] = useState([]);
    const [rotaAnterior, setRotaAnterior] = useState('');
    const [desabilitarClick, setDesabilitarClick] = useState(false);
    

    const contextValue = { token, setToken,
                            nome, setNome,
                            carrinho, setCarrinho,
                            rotaAnterior, setRotaAnterior,
                            desabilitarClick, setDesabilitarClick };

    return (
        <UserContext.Provider value={contextValue}>
        <BrowserRouter>
                <Header />
            <Routes>
                <Route path="/" element={<TelaHome />} />
                <Route name="type" path="/:type" element={<TelaProdutos />} />
                <Route name="id" path="/:type/:id" element={<TelaProduto />} />
                <Route path="/sign-up" element={<TelaCadastro />} />
                <Route path="/sign-in" element={<TelaLogin />} />
                <Route path="/cart" element={<TelaCarrinho />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </UserContext.Provider>
    );
}