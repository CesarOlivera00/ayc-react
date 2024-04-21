import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import ItemCount from './ItemCount';
import { useContext } from 'react';
import { GetPeripheralById } from "../data/firebase/firebase";
import CartContext from '../context/CartContext';

let styleTitleProduct = {
    fontSize: "30px",
    fontWeight: "500",
    marginTop: "20px"
}

let styleDescriptionProduct = {
    minHeight: "100px"
}

let styleImage = {
    height: "200px",
    margin: "auto"
}


const componentsImages = require.context("../assets/images", true);

const ProductItemDetail = () => {
    const { productId } = useParams();
    const [product, SetProduct] = useState({});
    const [countProducts, setCountProducts] = useState(0);

    const { addToCart } = useContext(CartContext);

    console.log(productId);

    useEffect(() => {
        setTimeout(() => {
            GetPeripheralById(productId).then((result) => {
                if (result != null) {
                    SetProduct(result);
                } else {
                    // Mostrar algun error.
                }
            });
        }, 1000);
    }, [productId]);

    // Funcion para el contador
    const onAdd = (count) => {
        console.log("Producto agregado al carrito: " + count.toString());
        setCountProducts(count);
        addToCart(product, count);
    }

    return (
        product.id != null ?
            <div style={{width: "300px", textAlign: "center", margin: "auto", marginTop: "20px"}}>
                {product.imageUrl != null ? <img src={componentsImages("./" + product.imageUrl)} alt="Shoes" style={styleImage}/> : ""}
                <h1 style={styleTitleProduct} className="p-2">{product.name}</h1>
                <p style={styleDescriptionProduct} className="p-2">{product.description}</p>
                { countProducts === 0 ? <ItemCount stock={10} initial={1} onAdd={onAdd}></ItemCount> : <Link to="/cart">Ver Carrito</Link> }
            </div>
        :
            <h2 style={{marginTop: "30px", color: "gray", fontSize: "25px", textAlign: "center"}}>Cargando...</h2>
    )
}

export default ProductItemDetail;