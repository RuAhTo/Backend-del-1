import React, {useState} from "react";
import ToDoCard from "./TodoCard/ToDoCard";

interface Todo {
    title: string;
    content: string;
    color: number;
    status: 'todo' | 'in-progress' | 'done';
}

interface CategoriesProps {
    todos: Todo[];
}


export default function Categories({ todos }: CategoriesProps){

    return(
        <>
            <div className="todo-status-container status-container">
                <div className="status-header">
                    <h2>To Do</h2>
                </div>
                <div className="status-content">
                  {todos
                    .filter(todo => todo.status === 'todo')
                    .map((todo, index) => (
                        <ToDoCard key={index} title={todo.title} content={todo.content} color={todo.color} />
                    ))}  
                </div>
            </div>

            <div className="in-progress-status-container status-container">
                <div className="status-header">
                    <h2>In Progress</h2>
                </div>
                <div className="status-content">
                    {todos
                    .filter(todo => todo.status === 'in-progress')
                    .map((todo, index) => (
                    <ToDoCard key={index} title={todo.title} content={todo.content} color={todo.color} />
                    ))}  
                </div>
            </div>

            <div className="done-status-container status-container">
                <div className="status-header">
                    <h2>Done</h2>
                </div>
                <div className="status-content">
                    {todos
                    .filter(todo => todo.status === 'done')
                    .map((todo, index) => (
                    <ToDoCard key={index} title={todo.title} content={todo.content} color={todo.color} />
                    ))}  
                </div>
            </div>
        </>
    )
}