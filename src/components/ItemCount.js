import { useState } from "react";

let styleButtonCount = {
    color: "white",
    width: "45px",
    height: "45px"
};

let borderButtonAdd = { borderRadius: "5px 0px 0px 5px" };
let borderButtonSubstract = { borderRadius: "0px 5px 5px 0px" };

let styleSpanCount = {
    backgroundColor: "#EFEFEF",
    width: "160px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

let styleButtonAddCart = {
    width: "100%"
}

const ItemCount = (props) => {
    const [count, setCount] = useState(props.initial);

    function handleAdd(){
        if (count < props.stock) setCount(count + 1);
    }

    function handleSubstract(){
        if (count > 1) setCount(count - 1);
    }

    return (
        <div style={{width: "250px", margin: "auto"}}>
            <div style={{display: "flex", margin: "10px 0px", justifyContent: "center"}}>
                <button style={{...styleButtonCount, ...borderButtonAdd}} className="btn btn-accent" onClick={handleAdd}><strong>+</strong></button>
                <span style={styleSpanCount}>{count}</span>
                <button style={{...styleButtonCount, ...borderButtonSubstract}} className="btn bg-ghost" onClick={handleSubstract}><strong>-</strong></button>
            </div>
            <button style={styleButtonAddCart} className="btn btn-success" onClick={() => props.onAdd(count)}>Agregar al Carrito</button>
        </div>
    );
};

export default ItemCount;