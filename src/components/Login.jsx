import styles from "./css/Login.module.css";
import React from "react";
import Img_Login from "./images/Login.png";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";



const Login = ({usuario,setFlag,user,setUser}) => {
  
  const [password, setPassword] = useState('');

  const handlerUser = ({ target }) => {
		setUser(target.value);
	};

  const handlerPass = ({ target }) => {
		setPassword(target.value);
	};

  const handlerSubmit = i =>{
    i.preventDefault();
    const e = usuario.filter(nombreU => nombreU.usuario === user);
    if(e.length === 0){
      alert("Este usuario no existe, por favor registrese");
      setFlag(false)
    }else if (e[0].password != password){
      alert("Contraseña incorrecta")
      setFlag(false)
    }else{
      setFlag(true)
    }
  }

  return (
    <div className={styles.container}>
      <img src={Img_Login} />
      <div>
        <form className={styles.form_login} onSubmit={handlerSubmit} >
          <label for="user">Nombre de Usuario</label>
          <input
            id="user"
            type="text"
            placeholder="xxxxxxxxxxxx"
            onChange={handlerUser}
            value={user}
          />
          <label for="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="xxxxxxxxxxxx"
            onChange={handlerPass}
            value={password}
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
