import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import Navbar from '../Home/Navbar';
import millify from 'millify';
function PrevOrders() {

    const companyGST = localStorage.getItem("userGST")
    const [loading, set_laoding] = useState(true)
    const [data, set_data] = useState([])
    const [filtered_data,set_filtered_data]=useState([])
    const [search_input,set_search_input]=useState("")
    const [init,set_init]=useState(false);

    useEffect(async () => {
        set_laoding(true)
        if(!init){
            const PORT = 4000
            const url = `http://localhost:${PORT}`
            await axios.post(`${url}/order/PastSales`, {
                companyGST: companyGST,
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

            set_filtered_data(
                data?.filter(
                    (d)=>
                    d.name.toLowerCase().includes(search_input.toLowerCase())
                    ))
            set_laoding(false)
        }

    }, [search_input])

    const renderContent = (
        <div className='tradersPage'>
            <div>
            <Navbar/>
            <br/>
            <br/>
            <br/>
            </div>
            <h1>
                <span className="yellow">Previous Orders</span></h1>
            <div className="grid">
                <form action method="get" className="search">
                    <div className="form__field">
                        <input type="search" 
                        name="search" 
                        value={search_input} 
                        placeholder="Write Trader Name" 
                        className="form__input" 
                        onChange={(text)=>{
                            set_search_input(text.target.value);
                }} />
                        {/* <input type="submit" defaultValue="Search" className="button" /> */}
                    </div>
                </form>
            </div>
            <br/>

            <div className="frame" />
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>SNo.</h1></th>
                        {/* <th><h1>ID</h1></th> */}
                        <th><h1>Name</h1></th>
                        <th><h1>Email</h1></th>
                        <th><h1>Gst No</h1></th>
                        <th><h1>Phone No.</h1></th>
                        <th><h1>Total Cost Price</h1></th>
                        <th><h1>Total Selling Price</h1></th>
                        <th><h1>Buy / Sell</h1></th>
                        <th><h1>Profit/Loss</h1></th>
                        {/* <th><h1>Add Items</h1></th> */}
                        {/* <th><h1>Completed</h1></th> */}
                        {/* <th><h1> </h1></th> */}
                    </tr>
                </thead>

                <tbody>
                    {filtered_data.map((trader, i) => {
                        // console.log(trader)
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                {/* <td>{trader.id}</td> */}
                                <td>{trader.name}</td>
                                <td>{trader.email}</td>
                                <td>{trader.gstNo}</td>
                                <td>{trader.phoneNo} </td>
                                <td>&#8377; {trader.totalCostPrice}</td>
                                <td>&#8377; {trader.totalSellingPrice}</td>
                                <td>{trader.buy_sell==1?"buy":"sell"}</td>
                                <td className={(trader.totalSellingPrice-trader.totalCostPrice)>=0?"profit":"loss"}>&#8377; {millify(trader.totalSellingPrice-trader.totalCostPrice)}</td>
                                {/* <td className='profit'>&#8377; {millify(trader.totalSellingPrice-trader.totalCostPrice)}</td> */}
                                {/* <td className='loss'>&#8377; {millify(trader.totalSellingPrice-trader.totalCostPrice)}</td> */}
                                
                                {/* <td><div className="table__button-group">
                                    <Link to ={trader.buy_sell==1?`/order/getOrderItemsBuy/${trader.orderID}`:`/order/getOrderItems/${trader.orderID}`}><input type="button" className="button" value="Items"/></Link>
                                </div>
                                </td>
                                <td><div className="table__button-group">
                                <input type="button" className="button"value="Add" onClick={e=>handleCompleteOrder(e,trader.orderID)}/>
                                </div>
                                </td> */}
                            </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )

    if (!localStorage.getItem("userGST")) return <Login />;

    return (
        <div>
            {loading ? <Loading /> : renderContent}
        </div>
    )
}

export default PrevOrders