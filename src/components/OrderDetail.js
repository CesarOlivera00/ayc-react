import { arrayRemove } from "firebase/firestore/lite";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetOrderById } from "../data/firebase/firebase";

let styleTableCart = {
    width: "550px",
    margin: "auto",
    marginTop: "30px"
};

let styleNameItem = {
    display: "inline-block",
    width: "300px"
};

let styleCantItem = {
    display: "inline-block",
    width: "50px"
};

let styleTotalOrder = {
    display: "inline-block",
    width: "350px"
};

let optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState({});

    useEffect(() => {
        GetOrderById(orderId).then((result) => {
            console.log(result);
            if (result != null) {
                setOrder(result);
            } else {
                // Mostrar algun error.
            }
        });
    }, []);

    return (
        <div>
            <h1 style={{display: "block", color: "black", fontSize: "30px", textAlign: "center", marginTop: "20px"}}>Detalles de Orden: {orderId}</h1>
            <table className="table" style={styleTableCart}>
                <tbody>
                    <tr>
                        <td>
                        {
                            order.items != null ?
                            <ul>
                                {
                                    order.items.map((item) => 
                                        <li key={item.id}>
                                            <span style={styleNameItem}>{item.name}</span>
                                            <span style={styleCantItem}>x{item.cant}</span>
                                            <span><strong>$ {item.price}</strong></span>
                                        </li>
                                    )
                                }
                            </ul>
                            :
                            <></>
                        }
                        </td>
                    </tr>
                    <tr>
                        <td><strong><span style={styleTotalOrder}>Total:</span> ${order.total != null ? order.total : "cargando..."}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Fecha: </strong>{order.date != null ? order.date.toLocaleDateString("es-US", optionsDate) : "cargando..."}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}