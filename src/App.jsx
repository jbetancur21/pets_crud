import React from "react";
import Login from "./components/Login"
import Home from "./components/Home"
import { useState } from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {

  const [user, setUser] = useState('');//Este estado almacena el valor del placeholder del usuario
  const [flag,setFlag] = useState(false)
  const [usuario, setUsuario] = useState([]);//Este estado almacena el array con los datos del usuario digitado en el placeholder del usuario
  
  const [clientes, setClientes] = useState([]); //Este estado almacena el array con los datos del usuario digitado en el placeholder del usuario
  const [update,setUpdate] = useState(false);

  useEffect(() => {
    console.log("Entré")
    fetch(
      "https://api-node-pets.herokuapp.com/api_clientes?accesstoken=eyJhbGciOiJIUzI1NiJ9.amJldGFuY3Vy.7eIqVgwsnN46_jXXw0-sPG2pdnh6PLTZesiH7pTWvSM"
    )
      .then((res) => res.json())
      .then((res) => setClientes(res));
      setUpdate(false)
  }, [update]);

  useEffect(() => {
    const getUser = () =>{
      fetch("https://api-node-pets.herokuapp.com/api/"+user+"?accesstoken=eyJhbGciOiJIUzI1NiJ9.amJldGFuY3Vy.7eIqVgwsnN46_jXXw0-sPG2pdnh6PLTZesiH7pTWvSM")
      .then((res) => res.json())
      .then((res) => setUsuario(res));
    }
    getUser();
  }, [user]);

  if(flag===true){
    return (
      <div>
       <Routes>
          <Route path="/" element={<Home setFlag={setFlag} clientes={clientes} setClientes={setClientes} setUpdate={setUpdate}/>}>
          </Route>
        </Routes> 
      </div>
    );
  }else{
    return (
      <div>
       <Routes>
          <Route path="/" element={<Login usuario={usuario} setFlag={setFlag} user={user} setUser={setUser}/>}>
          </Route>
        </Routes> 
      </div>
    );
  }


  
}

export default App;
