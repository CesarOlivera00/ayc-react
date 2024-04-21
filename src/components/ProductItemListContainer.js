import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetAllPeripherals, GetPeripheralsByCategoryId } from "../data/firebase/firebase";

import ProductItemList from './ProductItemList';

let styleContainer = {
    margin: "10px"
}

let styleTitle = {
    fontSize: "40px",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: "15px"
}

const ProductItemListContainer = () => {
    const { categoryId } = useParams()
    const [peripherals, SetPeripherals] = useState([]);

    let titleProducts;
    switch (categoryId != null ? categoryId.toString() : "") {
        case "1":
            titleProducts = "Teclados";
            break;
        case "2":
            titleProducts = "Mouses";
            break;
        default:
            titleProducts = "Todos";
            break;
    }

    useEffect(() => {
        if (categoryId != null) {
            GetPeripheralsByCategoryId(categoryId).then((result) => {
                SetPeripherals(result);
            });
        } else {
            GetAllPeripherals(categoryId).then((result) => {
                SetPeripherals(result);
            });
        }
    }, [categoryId]);
    
    return (
        <div style={styleContainer}>
            <h1 style={styleTitle}>{titleProducts}</h1>
            <ProductItemList items={peripherals}></ProductItemList>
        </div>
    );
}

export default ProductItemListContainer;