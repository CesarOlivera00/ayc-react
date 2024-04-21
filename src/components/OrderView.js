import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { GetAllOrders, GetOrderById } from "../data/firebase/firebase";

let styleTableCart = {
    width: "550px",
    margin: "auto",
    marginTop: "30px"
};

let styleButtonView = {
    backgroundColor: "#00C29B",
    borderColor: "#00A483"
};

let optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default function OrderView() {
    const [orders, SerOrders] = useState([]);

    useEffect(() => {
        GetAllOrders().then((result) => {
            console.log(result);
            SerOrders(result);
        });
    }, []);

    return (
        <div>
            <h1 style={{display: "block", color: "black", fontSize: "30px", textAlign: "center", marginTop: "20px"}}>Carrito de Compras</h1>
            {
                orders.length > 0 ?
                <table className="table" style={styleTableCart}>
                    <tbody>
                        {
                            orders.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.date.toLocaleDateString("es-US", optionsDate)}</td>
                                    <td><strong>$ {item.total}</strong></td>
                                    <td><Link to={"/order/" + item.id} className="btn" style={styleButtonView}>Detalles</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                :
                <h2>No se encontraron Ordenes realizadas...</h2>
            }
        </div>
    );
}