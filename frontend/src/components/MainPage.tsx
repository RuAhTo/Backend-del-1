import React, { useState } from "react";
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

