import { Outlet,Link  } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./css/Menu.module.css";

const Menu = ({setFlag}) => {


    const LogOut = () => {
        setFlag(false);
      };

return (
  <div>
    <div className={styles.sidenav}>
      <Link to="/">Propietarios</Link>
      <Link to="/mascotas">Mascotas</Link>
      <Link to="/medicamentos">Medicamentos</Link>
      <Link to="/" onClick={LogOut}>Cerrar Sesión</Link>
    </div>
    <Outlet />
  </div>
);


}

export default Menu;