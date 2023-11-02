import './App.css';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Home from './components/Home/Home';
import AddItem from './components/UserItem/AddItem'
import Items from './components/UserItem/Items';
import AddTrader from './components/Traders/AddTrader';
import Traders from './components/Traders/Traders';
import AddTraderItem from './components/TraderItems/AddTraderItem';
import TraderItems from './components/TraderItems/TraderItems';
import Orders from './components/Orders/Orders';
import AddOrder from './components/Orders/AddOrder';
import AddOrderItem from './components/OrderItemSell/AddOrderItem';
import OrderItems from './components/OrderItemSell/OrderItems';
import OrderItemsBuy from './components/OrderItemBuy/OrderItems';
import AddOrderItemBuy from './components/OrderItemBuy/AddOrderItem';
import PrevOrders from './components/Orders/PrevOrders';
import Home1 from './components/Home/Home1';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home1 />} />
        <Route exact path="/user/addItem" element={<AddItem />} />
        <Route exact path="/user/items" element={<Items />} />
        <Route exact path="/trader/getTraders" element={<Traders />} />
        <Route exact path="/trader/addTrader" element={<AddTrader />} />
        <Route exact path="/trader/getTraderItems/:id" element={<TraderItems />} />
        <Route exact path="/trader/addTraderItem/:id" element={<AddTraderItem />} />
        <Route exact path="/order/getOrders" element={<Orders />} />
        <Route exact path="/order/addOrder" element={<AddOrder />} />
        <Route exact path="/order/order" element={<AddOrder />} />
        <Route exact path="/order/getOrderItems/:orderID" element={<OrderItems />} />
        <Route exact path="/order/addOrderItem/:orderID" element={<AddOrderItem />} />
        <Route exact path="/order/getOrderItemsBuy/:orderID" element={<OrderItemsBuy />} />
        <Route exact path="/order/addOrderItemBuy/:orderID" element={<AddOrderItemBuy />} />
        <Route exact path="/order/PrevOrders" element={<PrevOrders />} />
        <Route path="*" element={<Navigate to ="/" />}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
