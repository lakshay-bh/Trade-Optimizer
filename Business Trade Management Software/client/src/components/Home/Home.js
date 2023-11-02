import React, { useEffect, useState } from 'react'
import Login from '../Login/Login';
import Loading from '../Loading/Loading';
import './Home.css'
import Navbar from './Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {

  const [loading, set_laoding] = useState(true)
  const [orderCount, set_orderCount] = useState("")
  const [items, set_items] = useState([])
  const [traders,set_traders]=useState([]);


// if (!localStorage.getItem("userGST")) return <Login/>


  useEffect(async () => {
    {console.log(localStorage.getItem("userGST"))}


    set_laoding(true)
    const PORT = 4000
    const url = `http://localhost:${PORT}`

    await axios.post(`${url}/order/getOngoingOrderCount`, {
      companyGST: localStorage.getItem("userGST"),
    }).then((response) => {
      // console.log(response.data[0].orderCount)
      if (response.data !== "No Items Found") {
        set_orderCount(response.data[0].orderCount)
      }
      // set_laoding(false)
    }).catch((e) => {
      console.log(e)
      alert("something went wrong")
      window.location.reload()
      set_laoding(false)
    })

    await axios.post(`${url}/user/getRestockedItems`, {
      companyGST: localStorage.getItem("userGST"),
    }).then((response) => {
      console.log(response.data)
      if (response.data !== "No Items Found") {
        set_items(response.data)
      }
      // set_laoding(false)
    }).catch((e) => {
      console.log(e)
      alert("something went wrong")
      // window.location.reload()
      set_laoding(false)
    })

    await axios.post(`${url}/trader/getTopTraders`, {
      companyGST: localStorage.getItem("userGST"),
    }).then((response) => {
      // console.log(response)
      if (response.data !== "error") {
        set_traders(response.data)
      }
      // set_laoding(false)
    }).catch((e) => {
      console.log(e)
      alert("something went wrong")
      // window.location.reload()
      set_laoding(false)
    })
    set_laoding(false)

  }, [])


  const renderContent = (
    <div>
      <Navbar />
      <div className="rela-block deer-section" >
        <div className='card-cover'>
          <Link to="/order/getOrders">
            <div className="card">
              You have {orderCount} ongoing orders
            </div>
          </Link>


          <Link to="/user/items">
            <div className="card">
             Out of Stock:
              <div className='traderNames'>
              {items.map((item,i)=>{
                // {console.log(item.itemName)}
                return(
                //  <Link to={`/trader/getTraderItems/${item.id}`}><div className='traderName'>{item.itemName}</div></Link>
               <Link to="/user/items"><div className='traderName'>{item.itemName}</div></Link>
                )
              })}
            </div>
            </div>
          </Link>

          <Link to="/trader/getTraders">
            <div className="card">
              Top Traders are:
              <div className='traderNames'>
              {traders.map((trader,i)=>{
                return(
                 <Link to={`/trader/getTraderItems/${trader.id}`}><div className='traderName'>{trader.name} {trader.relationScore}</div></Link>
                )
              })}
            </div>
            </div>
          </Link>

        </div>
      </div>


    </div>
  )
  return (
    <div>
      {loading ? <Loading /> : renderContent}
    </div>


  )
}

export default Home