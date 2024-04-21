import ProductItem from './ProductItem';

let styleListItem = {
    margin: "0px 50px",
    textAlign: "center"
}

const ProductItemList = (props) => {
    return (
        <div style={styleListItem}>
            {props.items.map((item) => <ProductItem key={item.id} idComponent={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl}></ProductItem> )}
        </div>
    );
};

export default ProductItemList;