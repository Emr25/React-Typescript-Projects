import React from 'react'
import { Todo } from "../types/todo"

interface TodoItemProps {
    todo: Todo;
    toogleTodo: (id: number) => void
    deleteTodo: (id: number) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toogleTodo, deleteTodo }) => {
    return (
        <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toogleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Sil</button>
        </li>
    )
}

export default TodoItem

