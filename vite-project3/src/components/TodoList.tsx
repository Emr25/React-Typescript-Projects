import { Todo, TodoList } from '../types/todo'
import React from 'react'
import { useState } from 'react'
import TodoItem from './TodoItem'

const TodoListComponet: React.FC = () => {
    const [todos, settodos] = useState<TodoList>([
        { id: 1, text: "Typescript öğren", completed: false },
        { id: 2, text: "Next Js öğren", completed: false }
    ])

    const [inputValue, setinputValue] = useState("");

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo: Todo = {
                id: Date.now(),
                text: inputValue,
                completed: false
            };
            settodos([...todos, newTodo]);
            setinputValue("");
        };
    }


    const toogleTodo = (id: number) => {
        settodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    }

    const deleteTodo = (id: number) => {
        settodos(todos.filter((todo) => todo.id !== id));
    }



    return (
        <div>
            <h1>Todo List</h1>
            <input type='text' value={inputValue} onChange={(e) => setinputValue(e.target.value)} placeholder='Yeni todo ekle...' />
            <button onClick={addTodo}>Ekle</button>

            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} toogleTodo={toogleTodo} deleteTodo={deleteTodo} />
                ))}
            </ul>
        </div>
    )
}

export default TodoListComponet