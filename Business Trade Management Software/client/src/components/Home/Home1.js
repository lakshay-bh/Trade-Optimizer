import React from 'react'
import Login from '../Login/Login'
import Home from './Home'

function Home1() {
if (!localStorage.getItem("userGST")){ 
    return <Login/>
}
else{
    return <Home/>

}

  return (
    <div>Home1</div>
  )
}

export default Home1