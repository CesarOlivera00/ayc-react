import './assets/css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import TopNavBar from './components/TopNavBar';
import ProductItemListContainer from './components/ProductItemListContainer';
import ProductItemDetail from './components/ProductItemDetail';
import CartView from './components/CartView';
import { CartContextProvider } from './context/CartContext'
import OrderView from './components/OrderView';
import OrderDetail from './components/OrderDetail';

function App() {
    return (
        <BrowserRouter>
            <CartContextProvider>
                <TopNavBar title="A Y C" />
                <Routes>
                    <Route path='/' element={<ProductItemListContainer title="todos" />}/>
                    <Route path='/category/:categoryId' element={<ProductItemListContainer />}/>
                    <Route path='/product/:productId' element={<ProductItemDetail/>}/>
                    <Route path="/cart" element={<CartView></CartView>}/>
                    <Route path="/orders" element={<OrderView></OrderView>}/>
                    <Route path="/order/:orderId" element={<OrderDetail></OrderDetail>}/>
                </Routes>
            </CartContextProvider>
        </BrowserRouter>
    );
}

export default App;
