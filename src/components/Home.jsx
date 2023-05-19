import React from "react";
import styles from "./css/Home.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = ({ setFlag, clientes,setUpdate }) => {
  const [owners, setOwners] = useState([]); //Este estado almacena un objeto con la informacion de los nuevos propietarios o la informacion para editar un propietario
  const [flagButton, setFlagButton] = useState(false);//Con esta bandera controlo el boton del formulario que se va a mostrar

  const LogOut = () => {
    setFlag(false);
  };

  const handleChange = (e) => {
    setOwners({ ...owners, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //Validacion de los datos
    e.preventDefault();
    if (
      owners.cedula === "" ||
      owners.nombre === "" ||
      owners.apellido === "" ||
      owners.direccion === "" ||
      owners.telefono === 0
    ) {
      alert("Todos los campos son obligatorios");
    } else {
      //consulta
      const requestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(owners),
      };
      fetch(
        "https://api-node-pets.herokuapp.com/api_clientes?accesstoken=eyJhbGciOiJIUzI1NiJ9.amJldGFuY3Vy.7eIqVgwsnN46_jXXw0-sPG2pdnh6PLTZesiH7pTWvSM",
        requestInit
      )
        .then((res) => res.json())
        .then((res) => console.log(res));

      setOwners({
        ...owners,
        cedula: 0,
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: 0,
      });
      setUpdate(true)
    }
  };

  const handleDelete = (id) => {
      const requestInit = {
        method: "DELETE",
      };
      fetch(
        "https://api-node-pets.herokuapp.com/api_clientes/" +
          id +
          "?accesstoken=eyJhbGciOiJIUzI1NiJ9.amJldGFuY3Vy.7eIqVgwsnN46_jXXw0-sPG2pdnh6PLTZesiH7pTWvSM",
        requestInit
      )
        .then((res) => res.text())
        .then((res) => console.log(res));
        setUpdate(true)
    
  };

  


  const updateValues = (id,cedula,nombre,apellido,direccion,telefono)=>{
    setFlagButton(true);
    setOwners({
      ...owners,
      id:id,
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      direccion: direccion,
      telefono: telefono,
    });
  }


  const handleUpdate = (e) => {

    e.preventDefault();
    //validación de los datos
    if (owners.cedula === "" ||
    owners.nombre === "" ||
    owners.apellido === "" ||
    owners.direccion === "" ||
    owners.telefono <= 0) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(owners),
    };
    fetch("https://api-node-pets.herokuapp.com/api_clientes/" + owners.id+"?accesstoken=eyJhbGciOiJIUzI1NiJ9.amJldGFuY3Vy.7eIqVgwsnN46_jXXw0-sPG2pdnh6PLTZesiH7pTWvSM", requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res));

    //reiniciando state de libro
    setOwners({
      ...owners,
      id:0,
      cedula: 0,
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: 0,
    });
    setUpdate(true)
    setFlagButton(false);
  };


  return (
    <div>
      <div className={styles.sidenav}>
        <a href="#">Propietarios</a>
        <a href="#">Mascotas</a>
        <a href="#">Medicamentos</a>
        <a onClick={LogOut}>Cerrar Sesión</a>
      </div>

      <div className={styles.main}>
        <table>
          <h3>Propietarios</h3>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Dirección</th>
            <th>Contacto</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
          {clientes.map((owner) => (
            <tr key={owner.id}>
              <td>{owner.cedula}</td>
              <td>{owner.nombre}</td>
              <td>{owner.apellido}</td>
              <td>{owner.direccion}</td>
              <td>{owner.telefono}</td>
              <td>
                <button onClick={() => updateValues(owner.id,owner.cedula,owner.nombre,owner.apellido,owner.direccion,owner.telefono)}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(owner.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </table>

        <form onSubmit={flagButton ? handleUpdate: handleSubmit} className={styles.form_login}>
          <label for="cedula">Cédula</label>
          <input
            value={owners.cedula}
            id="cedula"
            type="number"
            name="cedula"
            onChange={handleChange}
          />
          <label for="nombre">Nombre</label>
          <input
            value={owners.nombre}
            id="nombre"
            type="text"
            name="nombre"
            onChange={handleChange}
          />
          <label for="apellidos">Apellidos</label>
          <input
            value={owners.apellido}
            id="apellidos"
            type="text"
            name="apellido"
            onChange={handleChange}
          />
          <label for="direccion">Dirección</label>
          <input
            value={owners.direccion}
            id="direccion"
            type="text"
            name="direccion"
            onChange={handleChange}
          />
          <label for="contacto">Contacto</label>
          <input
            value={owners.telefono}
            id="contacto"
            type="number"
            name="telefono"
            onChange={handleChange}
          />
          {flagButton ? <button type="submit" onClick={handleUpdate}>Editar</button> : <button type="submit">Guardar</button>}
          
          
        </form>
        
      </div>
    </div>
  );
};

export default Home;
