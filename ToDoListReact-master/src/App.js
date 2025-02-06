import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");//clear input
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5235/';
// axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.timeout = 5000;

// function App() {
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState('');

//   useEffect(() => {
//     const loadTodos = async () => {
//       try {
//         const response = await axios.get('/items');
//         setTodos(response.data);
//       } catch (error) {
//         console.error('Error loading todos:', error);
//       }
//     };

//     loadTodos();
//   }, []);

//   const getTodos = async () => {
//     try {
//       const response = await axios.get('/items');
//       setTodos(response.data);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   };

//   const updateCompleted = async (todo, isComplete) => {
//     try {
//       await axios.put(`/items/${todo.id}`, { isComplete });
//       await getTodos(); // Refresh tasks list
//     } catch (error) {
//       console.error('Error updating todo:', error);
//     }
//   };

//   const deleteTodo = async (id) => {
//     try {
//       await axios.delete(`/items/${id}`);
//       await getTodos(); // Refresh tasks list
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="header">
//         <h1>todos</h1>
//         <form>
//           <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
//         </form>
//       </header>
//       <section className="main" style={{ display: "block" }}>
//         <ul className="todo-list">
//           {todos.map(todo => {
//             return (
//               <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
//                 <div className="view">
//                   <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
//                   <label>{todo.name}</label>
//                   <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//     </div>
//   );
// }

// export default App;