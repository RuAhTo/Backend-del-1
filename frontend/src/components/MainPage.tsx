import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import MainHeader from "./MainHeader";

interface Todo {
    title: string;
    content: string;
    color: number;
    status: 'todo' | 'in-progress' | 'done';
}

export default function MainPage() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (newTodo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

        async function fetchTodos() {
            try {
                const response = await fetch('http://localhost:3000/api/todos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setTodos(data); // Uppdatera state med hämtade todos
                    console.log('Todos fetched successfully', data);
                } else {
                    throw new Error('Failed to fetch todos ¯\\_(ツ)_/¯');
                }
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        }

        useEffect(() => {
            fetchTodos();
        }, [])

    return (
        <>
            <header>
                <MainHeader addTodo={addTodo} />
            </header>
            <main>
                <Categories todos={todos} />
            </main>
        </>
    );
}

