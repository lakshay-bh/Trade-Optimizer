import React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

const handleMenu=(e)=>{

  // $('#menuButton').on('change', function(){
    // console.log("heyy")
    ($('#menuButton').is(':checked')) ? (
        $('.the-bass').addClass('dropped')
    ) : (
        $('.the-bass').removeClass('dropped')
    );
  // });
}

function Navbar() {
  return(
    <div className="fixed-nav-bar">
    <Link to="/"><div className="logo"><span>Welcome</span> {localStorage.getItem("userGST")} </div></Link>
    <div>

    <input type="checkbox" id="menuButton" onClick={handleMenu}/>
    <label htmlFor="menuButton" className="menu-button-label">
      <div className="white-bar" />
      <div className="white-bar" />
      <div className="white-bar" />
      <div className="white-bar" />

    </label>
    <div className="the-bass">
    <div className="rela-block drop-down-container">
        <Link to="/">
          <div className="drop-down-item">
            <ul>
              <li> Home</li>
            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <Link to="/user/items">
          <div className="drop-down-item">
            <ul>
              <li> Inventory</li>
            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <Link to="/user/addItem">
          <div className="drop-down-item">
            <ul>
              <li> Add Item</li>
            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <Link to="/trader/getTraders">
          <div className="drop-down-item">
            <ul>
              <li> Traders</li>

            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <Link to="/trader/addTrader">
          <div className="drop-down-item">
            <ul>
              <li> Add Trader</li>
            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <Link to="/order/getOrders">
          <div className="drop-down-item">
            <ul>
              <li> Orders</li>
            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <Link to="/order/PrevOrders">
          <div className="drop-down-item">
            <ul>
              <li> Past Sales</li>
            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <Link to="/order/addOrder">
          <div className="drop-down-item">
            <ul>
              <li> Add Order</li>
            </ul>
          </div>
        </Link>
      </div>
      <div className="rela-block drop-down-container">
        <div className="drop-down-item" onClick={()=>{
            localStorage.clear();
            window.location.reload()
          }}>
          <ul><li><a href="#" >Logout</a> </li></ul>
        </div>
      </div>
      {/* <div className="rela-block drop-down-container">
      <div className="drop-down-item">
        <ul><li><a href="#">Inventory Table</a></li></ul>
      </div>
    </div> */}
    </div>
  </div>

  </div>
  )
  
}


export default Navbar



