import React from 'react'
import TodoCard from './TodoCard';
import { v4 as uuid } from 'uuid';
import { useState } from 'react'
import data from "./data.json"; //datos iniciales del archivo data.js

function TodoList() {
    const unique_id = uuid();//aquí se genera un código único, se actualiza cada vez que se actualiza la página

    //Estado incicial es list=data --> es decir un array [{}{}{}]
    const [list, setList] = useState(data); //[{}{}{}] lista de Items
    const [values, setValues] = useState({
        tarea: ""
    })

    const paintCard = () =>
        list.map((card, index) => (
            <TodoCard
                key={index}
                tarea={card.tarea}
                delete={() => deleteCard(index)}
            />
        ));

    const clearCard = () => setList([]);//vacía la lista -> list=[]

    const resetCard = () => setList(data);//resetea la lista ->list=data

    const deleteCard = (pos) => { //pos es la posición del array

        const remainingItems = list.filter((item, index) => index !== pos);
        setList(remainingItems);//esto modifica el estado con lo restante
    };//borra un item de la lista ->list=data


    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { id: uuid(), tarea: values.tarea }; // Generamos un ID único para la nueva tarea

        const item = { tarea };
        setList([...list, newItem]);
        setValues({ tarea: "" });//Resetea el valor del input a una cadena vacía
        console.log(item);
        console.log(list);
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

                <input type="text" name="values.tarea" value="" onChange={handleChange} />

                {values.tarea ?
                    <button type="submit">Add</button>
                    : null}

            </form>


            {paintCard()}

        </section>

    )

}


export default TodoList;