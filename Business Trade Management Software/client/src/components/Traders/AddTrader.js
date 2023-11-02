import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './AddTrader.css'
import Login from '../Login/Login'
import Navbar from '../Home/Navbar'


function AddTrader() {
  const companyGST = localStorage.getItem("userGST")
  const [name, set_name] = useState("")
  const [email, set_email] = useState("")
  const [phoneNo, set_phoneNo] = useState("")
  const [gstNo, set_gstNo] = useState("")
  const [addressStreet, set_addressStreet] = useState("")
  const [addressCity, set_addressCity] = useState("")
  const [addressState, set_addressState] = useState("")
  const [pinCode, set_pinCode] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // [req.body.companyGST,req.body.name,req.body.email,req.body.phoneNo,req.body.gstNo,req.body.address,req.body.pinCode],

    const PORT = 4000
    const url = `http://localhost:${PORT}`


    console.log(`${url}/trader/addTrader`)
    await Axios.post(`${url}/trader/addTrader`, {
      companyGST: companyGST,
      name: name,
      email: email,
      phoneNo: phoneNo,
      gstNo: gstNo,
      addressStreet: addressStreet,
      addressCity: addressCity,
      addressState: addressState,
      pinCode: pinCode
    }).then((response) => {
      console.log(response);
      if (response.data === "Created") {
        set_name("")
        set_email("")
        set_phoneNo("")
        set_gstNo("")
        set_addressStreet("")
        set_addressCity("")
        set_addressState("")
        set_pinCode("")
      } else {
        alert(response.data.sqlMessasge)
      }
    })

  }
    if (!localStorage.getItem("userGST")) return <Login />;

  return (
    <div>
      <Navbar/>
      <form className="box">
        <h1>Add Trader</h1>
        <input type="text" value={name} placeholder="Trader Name" onChange={(text) => {
          set_name(text.target.value);
        }} />

        <input type="email" value={email} placeholder="Email" onChange={(text) => {
          set_email(text.target.value);
        }} />

        <input type="number" value={phoneNo} placeholder="Phone number" pattern="[+]{1}[0-9]{11,14}" onChange={(text) => {
          set_phoneNo(text.target.value);
        }} />

        <input type="text" value={gstNo} placeholder="Gst No." onChange={(text) => {
          set_gstNo(text.target.value);
        }} />
        <input type="text" value={addressStreet} placeholder="Address" onChange={(text) => {
          set_addressStreet(text.target.value);
        }} />
        <input type="text" value={addressCity} placeholder="City" onChange={(text) => {
          set_addressCity(text.target.value);
        }} />
        <input type="text" value={addressState} placeholder="State" onChange={(text) => {
          set_addressState(text.target.value);
        }} />
        <input type="text" value={pinCode} placeholder="Pin Code" onChange={(text) => {
          set_pinCode(text.target.value);
        }} />

        <input type="submit" value="Add" onClick={handleSubmit} />
        {/* <input className='back' value="Goto Home" onClick={handleSubmit}/> */}
        <Link to="/trader/getTraders" className='back'>Goto Traders</Link>
      </form>
    </div>


  )
}

export default AddTrader