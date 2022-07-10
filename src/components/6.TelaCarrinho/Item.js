import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import dotenv from "dotenv";
import { useContext } from "react";
import UserContext from "../../UserContext";

dotenv.config();

export default function Item({ item }) {
    const { token, desabilitarClick, setDesabilitarClick, carrinho, setCarrinho } = useContext(UserContext);

    function excluir() {
        setDesabilitarClick(true);
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const promise = axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/${item}`, config);
            promise.catch(() => {
                alert("Erro no servidor. Tente em outra hora!");
            });
        } else {
            const novoCarrinho = carrinho.filter( elemento => elemento !== item);
            setCarrinho([...novoCarrinho]);
        }
        setDesabilitarClick(false);
    }

    return (
        <li>
            <div>
                <img src={item.image} alt="" />
                <p>{item.product}</p>
            </div>
            <p>{item.quantity}</p>
            <div>
                <p>R$ {Number(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                <FaTimesCircle 
                    color="var(--vermelho)" 
                    style={{width: "2vh", height: "2vh", pointerEvents: desabilitarClick ? 'none' : 'initial'}}
                    onClick={excluir}
                    />
            </div>
        </li>
    );
} 
