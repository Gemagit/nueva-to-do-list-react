import React from 'react'
import TodoCard from './TodoCard';
import { v4 as uuid } from 'uuid';
import { useState, useRef } from 'react'
import data from "./data.json"; //datos iniciales del archivo data.js


function TodoList() {
  const unique_id = uuid();//aquí se genera un código único, se actualiza cada vez que se actualiza la página

  //Estado incicial es list=data --> es decir un array [{}{}{}]
  const [list, setList] = useState(data); //[{}{}{}] lista de Items
  const [values, setValues] = useState({ tarea: "" })
  const tareaRef = useRef(null);//referencia al input tarea
  const [showMessage, setShowMessage] = useState(false);//estado que maneja el mensaje
  const [editingIndex, setEditingIndex] = useState(null);//estado que maneja el editado de tarjeta


  const paintCard = () =>
    list.map((card, index) => (
      <TodoCard
        key={index}
        tarea={card.tarea}
        delete={() => deleteCard(index)}
        edit={() => setEditingIndex(index)}
      />
    ));


  const clearCard = () => setList([]);//vacía la lista -> list=[]
  const resetCard = () => setList(data);//resetea la lista ->list=data
  const deleteCard = (pos) => { //pos es la posición del array

    const remainingItems = list.filter((item, index) => index !== pos);
    setList(remainingItems);//esto modifica el estado con lo restante
  };//borra un item de la lista ->list=data


    // Limpiar el input de tarea después de 20 segundos
    setTimeout(() => {
      setValues({ tarea: '' });
    }, 20000);



  const handleSubmit = (e) => {
    e.preventDefault();
    const tarea = e.target.tarea.value;

    // Validación para que la tarea tenga al menos 6 caracteres
    if (values.tarea.length < 6) {
      alert('La tarea debe tener al menos 6 caracteres');
      return;
    }

    const newItem = { id: uuid(), tarea }; // Generamos un ID único para la nueva tarea

    setList([newItem, ...list]);
    setValues({ tarea: "" });//Resetea el valor del input a una cadena vacía
    tareaRef.current.value = "";


    // Mensaje de tarea añadida
    setShowMessage(true);


    // se oculta el mensaje después de 5 segundos
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);

  };

  const handleEditSubmit = (index, editedTarea) => {
    const newList = [...list];
    newList[index].tarea = editedTarea;
    setList(newList);
    setEditingIndex(null); // Dejar de editar la tarjeta
  };


  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <section>
      <h4>MI PRIMER ORGANIZADOR DE TAREAS EN REACT</h4>
      <button onClick={clearCard}>Clear</button>
      <button onClick={resetCard}>Reset</button>


      <form onSubmit={handleSubmit}>
        <label>Añade una nueva tarea:</label>
        <input type="text" name="tarea" value={values.tarea} onChange={handleChange} ref={tareaRef} />
        {values.tarea ?
          <button type="submit">Add</button>
          : null}
      </form>


      {showMessage && <div className='show'>¡¡¡Tarea añadida!!!</div>}

      {editingIndex !== null && (
        <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(editingIndex, e.target.tarea.value); }}>
          <input type="text" defaultValue={list[editingIndex].tarea} name="tarea" />
          <button type="submit">Guardar</button>
        </form>
      )}

      {paintCard()}


    </section>

  )

}


export default TodoList;
