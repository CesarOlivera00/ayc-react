import { Link } from "react-router-dom";

let styleItem = {
    display: "inline-block",
    margin: "10px",
    textAlign: "left"
}

let styleImage = {
    height: "200px"
}

const componentsImages = require.context("../assets/images", true);

const ProductItem = (props) => {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl" style={styleItem}>
            <figure><img src={componentsImages("./" + props.imageUrl)} alt="Shoes" style={styleImage}/></figure>
            <div className="card-body">
                <h2 className="card-title">{props.price.toString()}</h2>
                <p>{props.name}</p>
                <div className="card-actions justify-end">
                    <Link to={"/product/" + props.idComponent} className="btn btn-primary">Comprar Ahora</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;