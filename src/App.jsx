import React from "react";
import Login from "./components/Login"
import Home from "./components/Home"
import Menu from "./components/Menu"
import Mascotas from "./components/Mascotas"
import Medicamentos from "./components/Medicamentos"
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
      "http://localhost:9000/api_clientes?accesstoken=eyJhbGciOiJIUzI1NiJ9.amJldGFuY3Vy.7eIqVgwsnN46_jXXw0-sPG2pdnh6PLTZesiH7pTWvSM"
    )
      .then((res) => res.json())
      .then((res) => setClientes(res));
      setUpdate(false)
  }, [update]);

  useEffect(() => {
    const getUser = () =>{
      fetch("http://localhost:9000/api/"+user+"?accesstoken=eyJhbGciOiJIUzI1NiJ9.amJldGFuY3Vy.7eIqVgwsnN46_jXXw0-sPG2pdnh6PLTZesiH7pTWvSM")
      .then((res) => res.json())
      .then((res) => setUsuario(res));
    }
    getUser();
  }, [user]);

  if(flag===true){
    return (
      <div>
        <Routes>
          <Route path="/" element={<Menu setFlag={setFlag} />} >
            <Route path="/" element={<Home clientes={clientes} setClientes={setClientes} setUpdate={setUpdate} />}></Route>
            <Route path="/mascotas" element={<Mascotas clientes={clientes} setClientes={setClientes} setUpdate={setUpdate} />}></Route>
            <Route path="/medicamentos" element={<Medicamentos clientes={clientes} setClientes={setClientes} setUpdate={setUpdate} />}></Route>
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
