import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import './AddTraderItem.css'
import Loading from '../Loading/Loading';
import { Link, useParams } from 'react-router-dom';
import Login from '../Login/Login';
import Navbar from '../Home/Navbar';

function AddTraderItem() {
    const companyGST = localStorage.getItem("userGST")
    const [loading, set_laoding] = useState(true)
    const [data, set_data] = useState([])
    const [filtered_data,set_filtered_data]=useState([])
    const [search_input,set_search_input]=useState("")
    const [init,set_init]=useState(false);
    const {id}= useParams()

    useEffect(async () => {
        set_laoding(true)
        if(!init){
            const PORT = 4000
            const url = `http://localhost:${PORT}`
            await axios.post(`${url}/trader/getOtherItems`, {
              companyGST: companyGST,
              traderID:id
            }).then((response) => {
                console.log(response)
                if(response.data!="No Items Found"){
                    
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
        else{

            set_filtered_data(data?.filter((d)=>d.itemName.toLowerCase().includes(search_input.toLowerCase())))
            set_laoding(false)
        }
    


    }, [search_input])

    if (!localStorage.getItem("userGST")) return <Login />;

    const handleAddItem = async (e,itemID) => {
        e.preventDefault()

        const PORT = 4000
        const url = `http://localhost:${PORT}`


        console.log(`${url}/trader/addItem`)
          await axios.post(`${url}/trader/addItem`,{
            companyGST:companyGST,
            itemID:itemID,
            traderID:id
          }).then((response)=>{
            // console.log(response);
              if(response.data==="Added"){
                  // alert("deleted")
                window.location.reload()
              }else{
                alert(response.data.sqlMessage)

                  console.log(response)
                // alert(response)
                // window.location.reload()

              }
          })

    }
    const renderContent = (
        <div>
            <Navbar/>
            <br/>
            <br/>
            <br/>
            <h1>
                <span className="yellow">Items</span></h1>
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
                <Link to={`/trader/getTraderItems/${id}`}> <input type="button" className="button1" style={{borderRadius:8,position:'relative'}}value="Go Back"/></Link>

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
                        <th><h1>Price</h1></th>
                        <th><h1>Description</h1></th>
                        {/* <th><h1>Buy / Sell</h1></th> */}
                        <th><h1>Add </h1></th>
                    </tr>
                </thead>

                <tbody>
                    {filtered_data.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                {/* <td>{item.id}</td> */}
                                <td>{item.itemName}</td>
                                <td>{item.itemQty} units</td>
                                <td>&#8377;{item.pricePerQty} </td>
                                <td>{item.description}</td>
                                <td><div className="table__button-group">
                                    <input type="button" className="button"value="Add" onClick={e=>handleAddItem(e,item.id)}/>
                                </div>
                                </td>
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

export default AddTraderItem