import { createContext, useState } from "react";

const CartContext = createContext();
const { Provider } = CartContext;

export function CartContextProvider({children}) {
    const [cart, setCart] = useState([]);

    const addToCart = (item, cant) => {
        let newItem = {...item, cant};
        let newArray = cart;

        let indexIsInCart = isInCart(item.id);
        if (indexIsInCart == -1){
            newArray.push(newItem);
        }
        else {
            newArray[indexIsInCart].cant += cant;
        }

        setCart(newArray);

        console.log("se agrego el producto al carrito");
        console.log(cart);
    };

    const deleteItemCart = (id) => {
        const newCart = [...cart];
        const cartFilter = newCart.filter(item => { return item.id != id });
        setCart(cartFilter);
    };

    const clearCart = () => {
        setCart([]);
    }

    const isInCart = (id) => {
        let arrayAux = cart.filter(x => x.id == id);
        if (arrayAux.length > 0){
            return cart.indexOf(arrayAux[0]);
        }
        else {
            return -1;
        }
    };

    const getTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach(item => totalPrice += item.price * item.cant);

        return totalPrice;
    }

    return (
        <Provider value={{ addToCart, deleteItemCart, clearCart, getTotalPrice, cart }}>
            {children}
        </Provider>
    )
}

export default CartContext;