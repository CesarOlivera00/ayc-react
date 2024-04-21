import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import CartContext from '../context/CartContext'
import { CreateBuyOrder } from "../data/firebase/firebase"

const componentsImages = require.context("../assets/images", true);

let styleImageItem = {
    height: "100px",
    margin: "auto"
};

let styleTableCart = {
    width: "800px",
    margin: "auto",
    marginTop: "30px"
};

let styleButtonDelete = {
    backgroundColor: "#EC0505",
    borderColor: "#C20000"
};

export default function CartView() {
    const [orderDone, setOrderDone] = useState(false);
    const { cart, deleteItemCart, getTotalPrice, clearCart } = useContext(CartContext);

    function handleBuy() {
        const buyOrder = {
            buyer: {
                name: "Cesar",
                phone: "123456789",
                email: "cesar.test@gmail.com"
            },
            items: cart.map((item) => { return { id: item.id, name: item.name, price: item.price, cant: item.cant } }),
            total: getTotalPrice()
        }

        CreateBuyOrder(buyOrder);
        setOrderDone(true);
        clearCart();
    }

    return (
        cart != null && cart.length > 0 ?
            <div>
                <h1 style={{display: "block", color: "black", fontSize: "30px", textAlign: "center", marginTop: "20px"}}>Carrito de Compras</h1>
                <table className="table" style={styleTableCart}>
                    <tbody>
                        {
                            cart.map((item) => 
                                <tr key={item.id}>
                                    <td><img src={componentsImages("./" + item.imageUrl)} alt="Shoes" style={styleImageItem}/></td>
                                    <td>
                                        <p>{item.description}</p>
                                        <br/>
                                        <br/>
                                        <strong>${item.price}</strong>
                                    </td>
                                    <td><strong>x{item.cant}</strong></td>
                                    <td><button className="btn" style={styleButtonDelete} onClick={() => deleteItemCart(item.id)}>Eliminar</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div style={{display: "block", textAlign: "center", marginTop: "20px"}}>
                    <button style={{width: "200px"}} className="btn btn-success" onClick={handleBuy}>Comprar!</button>
                </div>
            </div>
        :
            orderDone == false ?
                <div style={{textAlign: "center"}}>
                    <h1 style={{marginTop: "30px", color: "gray", fontSize: "25px", textAlign: "center"}}>No hay productos cargados...</h1>
                    <Link to="/" className="btn btn-info" style={{marginTop: "20px"}}>Ir a comprar!</Link>
                </div>
            :
                <div style={{textAlign: "center"}}>
                    <h1 style={{marginTop: "30px", color: "black", fontSize: "25px", textAlign: "center"}}>Gracias por tu compra!!!</h1>
                    <Link to="/" className="btn btn-info" style={{marginTop: "20px"}}>Volver a comprar!</Link>
                </div>
    )
}