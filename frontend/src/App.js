import logo from './logo.svg';
import {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const Todos = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button 
                onClick={() => modifyStatusTodo(todo)}
                className="checkbox" style={{backgroundColor: todo.status ? "#A879E6" : "white"}}>
              </button>
              <p>{todo.nome}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const Logs = ({ logs }) => {
    return (
      <div className="todos">
        {logs.map((logs) => {
          return (
            <div className="todo">
              <p>{logs.requisicao}</p>
              <p>{logs.createdAt}</p>
            </div>
          );
        })}
      </div>
    );
  };

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  };

  async function handleWithLogButton() {
    setLogVisibility(!logVisibility);
  };

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisibility(true);
  };

  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
  };

  async function editTodo(todo) {
    const resp = await axios.put
      ("http://localhost:3333/todos", {id: selectedTodo.id, nome: inputValue});
    setSelectedTodo();
    setInputVisibility(false);
    getTodos();
    setInputValue("");
  };

  async function createTodo() {
    const response = await axios.post
      ("http://localhost:3333/todos", {nome: inputValue});
      getTodos();
      setInputVisibility(!inputVisibility);
      setInputValue("");
  };

  async function deleteTodo(todo) {
    
    const resp = await axios.delete(`http://localhost:3333/todos/${todo.id}`);
    console.log(resp)
    getTodos();
  };

  async function modifyStatusTodo(todo) {
    const resp = await axios.put
      ("http://localhost:3333/todos", {id: todo.id, status: !todo.status});
    getTodos();
  };

  async function getLogs() {
    const response = await axios.get("http://localhost:3333/logs");
      setLogs(response.data);
      setLogVisibility(!logVisibility);
  };

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  const [logs, setLogs] = useState([]);
  const [logVisibility, setLogVisibility] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);
  
  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Dont be lazzy</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input 
          value={inputValue}
          style={{display: inputVisibility ? "block" : "none"}}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="inputName">
        </input>
        <div>
          <button 
            onClick={inputVisibility 
              ? selectedTodo 
                ? editTodo
                : createTodo 
              : handleWithNewButton} 
            className="newTaskButton">
              {inputVisibility ? "Confirm" : "+ New task"}
          </button>
          <button 
            onClick={getLogs} 
            className="newTaskButton">
              Show logs
          </button>
        </div>
        <Logs logs={logs}></Logs>
      </header>
    </div>
  );
}

export default App;
