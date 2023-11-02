import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link,useParams } from 'react-router-dom';
import Login from '../Login/Login';
import Navbar from '../Home/Navbar';
import millify from 'millify';
// import './OrderItemsBuy.css'
function OrderItemsBuy() {

    const companyGST = localStorage.getItem("userGST")
    const [loading, set_laoding] = useState(false)
    const [data, set_data] = useState([])
    const [filtered_data,set_filtered_data]=useState([])
    const [search_input,set_search_input]=useState("")
    const [init,set_init]=useState(false);
    const {orderID}= useParams();

    useEffect(async () => {
        console.log("inside use effect ")
        set_laoding(true)
        if(!init){
            const PORT = 4000
            const url = `http://localhost:${PORT}`
            await axios.post(`${url}/order/getOrderItems`, {
                companyGST: companyGST,
                orderID:orderID
            }).then((response) => {
                console.log(response)
                if(response.data!="No Items Found"){
                    
                    set_data(response.data)
                    set_filtered_data(response.data)
    
                    set_init(true)
                }
                set_laoding(false)
            }).catch((e) => {
                console.log(e)

                set_laoding(false)
                alert("something went wrong")
            })
        }
        else{

            set_filtered_data(data?.filter((d)=>d.itemName.toLowerCase().includes(search_input.toLowerCase())))
            set_laoding(false)
        }
    


    }, [search_input])

    if (!localStorage.getItem("userGST")) return <Login />;
    const renderContent = (
        <div>
            <Navbar/>
            <br/>
            <br/>
            <br/>
            <h1>
                <span className="yellow">Buy Items</span></h1>
            <div className="grid">
                <form action method="get" className="search">
                    <div className="form__field">
                        <input type="search" 
                        name="search" 
                        value={search_input} 
                        placeholder="Write Item Name" 
                        className="form__input" 
                        onChange={(text)=>{
                            set_search_input(text.target.value);
                }} />
                        {/* <input type="submit" defaultValue="Search" className="button" /> */}
                    </div>
                </form>
                <br/>
                <Link to={`/order/addOrderItemBuy/${orderID}`}> <input type="button" className="button1" style={{borderRadius:8,position:'relative'}}value="Add Another Item"/></Link>
                <Link to="/order/getOrders"> <input type="button" className="button1" style={{borderRadius:8,position:'relative'}}value="Goto Orders"/></Link>


            </div>
            <br/>
            <br/>

            <div className="frame" />
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>SNo.</h1></th>
                        {/* <th><h1>ID</h1></th> */}
                        <th><h1>Name</h1></th>
                        <th><h1>Quantity</h1></th>
                        <th><h1>Description</h1></th>
                        <th><h1>Cost Price</h1></th>
                        {/* <th><h1>Sell Price</h1></th> */}
                        <th><h1>Profit/Loss</h1></th>

                        {/* <th><h1>Buy / Sell</h1></th> */}
                        {/* <th><h1>Delete </h1></th> */}
                    </tr>
                </thead>

                <tbody>
                    {console.log(filtered_data)}
                    {filtered_data.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                {/* <td>{item.id}</td> */}
                                <td>{item.itemName}</td>
                                <td>{item.itemQtyNew} units</td>
                                <td>{item.description}</td> 
                                <td>&#8377; {millify(item.costPricePerQty)} </td>
                                {/* <td>&#8377; {millify(item.sellPricePerQty)} </td> */}
                                <td className={(item.sellPricePerQty-item.pricePerQty   )>=0?"profit":"loss"}>&#8377; {millify((item.sellPricePerQty-item.pricePerQty)*item.itemQtyNew)} </td>
                            </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )

    
    return (
        <div>
            {loading ? <Loading /> : renderContent}
        </div>
    )
}

export default OrderItemsBuy