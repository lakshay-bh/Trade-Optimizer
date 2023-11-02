import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link,Redirect } from 'react-router-dom';
import Login from '../Login/Login';
import Searchable from 'react-searchable-dropdown';
import Navbar from '../Home/Navbar';
import './AddOrder.css'
function AddOrder() {

    const companyGST = localStorage.getItem("userGST")
    const [loading, set_laoding] = useState(true)
    const [data, set_data] = useState([])
    const [filtered_data, set_filtered_data] = useState([])
    const [search_input, set_search_input] = useState("")
    const [init, set_init] = useState(false);
    const [buy_sell, set_buy_sell] = useState(1)
    const [trader, set_trader] = useState(null)
    const [trader_name,set_trader_name]=useState("")

    useEffect(async () => {
        set_laoding(true)
        if (!init) {
            const PORT = 4000
            const url = `http://localhost:${PORT}`
            await axios.post(`${url}/trader/getTraders`, {
                companyGST: companyGST,
            }).then((response) => {
                // console.log(response)
                if (response.data != "No Items Found") {
                    set_data(response.data)
                    set_filtered_data(response.data)
                    set_init(true)
                }
                set_laoding(false)
            }).catch(() => {
                console.log("Errrorr")

                set_laoding(false)
                alert("something went wrong")
            })
        }
        else {

            set_filtered_data(
                data?.filter(
                    (d) =>
                        d.name.toLowerCase().includes(search_input.toLowerCase())
                ))
            set_laoding(false)
        }
    }, [search_input])

    const options1 = []

    filtered_data.map((d) => {
        options1.push({ "value": d.id, "label": d.name })
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        // [req.body.companyGST,req.body.name,req.body.email,req.body.phoneNo,req.body.gstNo,req.body.address,req.body.pinCode],
    
        const PORT = 4000
        const url = `http://localhost:${PORT}`
    
    
        console.log(`${url}/order/addOrder`)
        await axios.post(`${url}/order/addOrder`, {
          companyGST: companyGST,
          traderID: trader,
          buy_sell: buy_sell,
        }).then((response) => {
          console.log(response);
          if (response.data === "Created") {
            alert("created")
            // <Redirect to="/order/getOrders"/>
            set_trader(null)
            set_trader_name("")
            
          } else {
            alert(response.data.sqlMessasge)
          }
        })
    
      }

    const renderContent = (
        <div>
            <Navbar />
            <form className="box">
                <h1>Add Order</h1>

                <Searchable
                

                    className="searchable"
                    // style={{backgroundColor:"transparent"}}
                    value={trader_name}
                    placeholder="Select Trader"
                    hideSelected
                    listMaxHeight={200} //by default 140
                    options={options1}
                    onSelect={value => {
                        set_trader(value)
                    }}
                />

                <Searchable

                    className="searchable1"
                    value={1}
                    // style={{backgroundColor:"transparent"}}
                    // value={"Trader1"}
                    placeholder="Buy/Sell"
                    hideSelected
                    listMaxHeight={200} //by default 140
                    options={
                        [
                        {
                            label:"Buy",
                            value:1
                        },
                        {
                            label:"Sell",
                            value:2
                        },
                    ]
                    }
                    onSelect={value => {
                        set_buy_sell(value)
                    }}
                />

        <input type="submit" className="buttonAddOrder" value="Add" onClick={handleSubmit} />
        <Link to="/order/getOrders" className='back'>Goto Orders</Link>




            </form>
        </div>
    )

    if (!localStorage.getItem("userGST")) return <Login />;

    return (
        <div>
            {loading ? <Loading /> : renderContent}
        </div>
    )
}
export default AddOrder