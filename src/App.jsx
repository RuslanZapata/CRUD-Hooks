import React, {useState}from 'react';

function App() {
  const shortid = require('shortid')
  const [tarea, setTarea] = useState('')
  const [listaTareas, setListaTares] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  const agregarTarea = (e) => {
    e.preventDefault()
    if (!tarea.trim()) {
      console.log('Ingrese por favor lo que se le pide');
      setError('Ingrese los datos requeridos por favor')
    }else{
      setListaTares([
        ...listaTareas,
        {id: shortid.generate(), tarea:tarea},
        ])
      setError(null)
    }
    setTarea('')
  }

  const editarTarea = (e) => {
    e.preventDefault()

    if (!tarea) {      
      setError('Ingrese los datos requeridos por favor')
    } else {
      const arrayEditado = listaTareas.map(item=>{
        if (item.id === id) {
          return {id:id, tarea:tarea}
        }else{
          return item
        }
      })
      setListaTares(arrayEditado)
      setModoEdicion(false)
      setTarea('')  
      setId('')
      setError(null)
    }    
  }

  const eliminarTarea = (id) => {
    const arrayFiltrado = listaTareas.filter(item => item.id !== id)
    setListaTares(arrayFiltrado)
  }

  const editar = (item) => {
    setModoEdicion(true)
    setTarea(item.tarea)
    setId(item.id)
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">CRUD Hooks</h2>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">lista de Tareas</h4>
          <ul className="list-group">
            {
              listaTareas.length === 0 ?(
                <li className="list-group-item">No hay tareas</li>
              ):(
                listaTareas.map((item, index)=>(
                  <li key={item.id} className="list-group-item">
                    <span className="lead">{index+1}) {item.tarea}</span>
                    <button
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={()=>eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm float-right"
                      onClick={()=>editar(item)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              )              
            }
            
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion?'Editar tarea':'Agregar tarea'
            }
          </h4>
          <form onSubmit={modoEdicion?editarTarea:agregarTarea}>
            {
              error?<span className="text-danger">{error}</span>:null
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e)=>setTarea(e.target.value)}
              value={tarea}
            />
            <button className="btn btn-dark btn-block" type="submit">
              {
                modoEdicion?'Guardar':'Agregar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
