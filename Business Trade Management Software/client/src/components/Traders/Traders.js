import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Traders.css'
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import Navbar from '../Home/Navbar';
function Traders() {

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
            await axios.post(`${url}/trader/getTraders`, {
                companyGST: companyGST,
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

            set_filtered_data(
                data?.filter(
                    (d)=>
                    d.name.toLowerCase().includes(search_input.toLowerCase())
                    ))
            set_laoding(false)
        }

    }, [search_input])

    const handleDeleteTrader = async (e,id) => {
        e.preventDefault()

        const PORT = 4000
        const url = `http://localhost:${PORT}`


        console.log(`${url}/trader/deleteTrader`)
          await axios.post(`${url}/trader/deleteTrader`,{
            companyGST:companyGST,
            traderID:id
          }).then((response)=>{
            console.log(response);
              if(response.data==="Done"){
                  alert("deleted")
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
        <div className='tradersPage'>
            <div>
            <Navbar/>
            <br/>
            <br/>
            <br/>
            </div>
            <h1>
                <span className="yellow">Traders</span></h1>
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
                        {/* <input type="submit" value="Update" defaultValue="Update Relation Score" className="button" /> */}
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
                        <th><h1>Address</h1></th>
                        <th><h1>Score</h1></th>
                        <th><h1>Items</h1></th>
                        {/* <th><h1>Buy / Sell</h1></th> */}
                        <th><h1>Delete </h1></th>
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
                                <td>{trader.addressStreet},{trader.addressCity}</td>
                                <td>{trader.relationScore} </td>

                                <td><div className="table__button-group">
                                   <Link to={`/trader/getTraderItems/${trader.id}`} > <input type="button" className="button" value="Items"/></Link>
                                </div>
                                </td>
                                <td><div className="table__button-group">
                                    <input type="button" className="button" value="Delete" onClick={e=>handleDeleteTrader(e,trader.id)}/>
                                </div>
                                </td>
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

export default Traders