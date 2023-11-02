import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Login from '../Login/Login'
import Navbar from '../Home/Navbar'


function UserItem() {
  const companyGST=localStorage.getItem("userGST")
  const [item_name, set_item_name] = useState("");
  const [item_qty, set_item_qty] = useState("");
  const [item_ppq, set_item_ppq] = useState("");
  const [item_description, set_item_description] = useState("");
  

  const handleSubmit=async(e)=>{
    e.preventDefault()
    // [req.body.gstNo,req.body.itemName,req.body.itemQty,req.body.pricePerQty,req.body.description],
  
    const PORT = 4000  
    const url=`http://localhost:${PORT}`


    console.log(`${url}/user/addItem`)
      await Axios.post(`${url}/user/addItem`,{
        gstNo:companyGST,
        itemName:item_name,
        itemQty:item_qty,
        pricePerQty:item_ppq,
        description:item_description
      }).then((response)=>{
        console.log(response);
          if(response.data==="Created"){
            set_item_name("")
            set_item_description("")
            set_item_ppq("")
            set_item_qty("")
          }else{
            alert("Incorrect input")
          }
      })

  }
  if (!localStorage.getItem("userGST")) return <Login />;


  return (
  <div>
    <Navbar/>
    <br/>
    <br/>

    <form className="box">
      <h1>Add Item</h1>
      <input type="text" value={item_name} placeholder="Item Name"  onChange={(text)=>{
                  set_item_name(text.target.value);
                }} />

      <input type="number" value={item_qty} placeholder="Current Quantity"  onChange={(text)=>{
                  set_item_qty(text.target.value);
                }} />

      <input type="number" value={item_ppq} placeholder="Price Per Quantity"  onChange={(text)=>{
                  set_item_ppq(text.target.value);
                }} />

      <input type="text" value={item_description} placeholder="Description" onChange={(text)=>{
                  set_item_description(text.target.value);
                }} />
      
    <input type="submit" value="Add" onClick={handleSubmit}/>
    {/* <input className='back' value="Goto Home" onClick={handleSubmit}/> */}
    <Link to="/user/items" className='back'>Goto Items</Link>
    </form>
</div>


  )
}

export default UserItem