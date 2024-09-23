import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import MainHeader from "./MainHeader";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import '../index.css'

interface Todo {
    id: number;
    title: string;
    content: string;
    color: number;
    status: 'todo' | 'in-progress' | 'done';
}

export default function MainPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
    
        if (!over) return;
    
        const activeId = active.id.toString();
        const overId = over.id.toString();
    
        // Om kortet dras till en ny kategori
        if (activeId !== overId) {
            const oldTodo = todos.find(todo => todo.id.toString() === activeId);
            const newStatus = overId; // Nya statusen är id:t på den nya droppable-zonen
    
            if (oldTodo && newStatus) {
                // Uppdatera status i state, resten av todo-objektet förblir oförändrat
                const updatedTodo = { ...oldTodo, status: newStatus as 'todo' | 'in-progress' | 'done' };
    
                setTodos(todos.map(todo =>
                    todo.id.toString() === activeId ? updatedTodo : todo
                ));
    
                try {
                    const response = await fetch(`http://localhost:3000/api/todos/${updatedTodo.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: updatedTodo.status }),
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log('response ok', data, ` Todo ${updatedTodo.id} has been updated to ${newStatus} `);
                    } else {
                        throw new Error('Something went wrong ¯\\_(ツ)_/¯');
                    }
                } catch (error) {
                    console.log('Error', error);
                }
            }
        }
    }

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
                setTodos(data);
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
    }, []);

    return (
        <>
            <DndContext onDragEnd={handleDragEnd}>
            <header>
                <MainHeader addTodo={(newTodo: Todo) => setTodos([...todos, newTodo])} />
            </header>
                <main>
                    <Categories todos={todos} setTodos={setTodos} />
                </main>
            </DndContext>
        </>
    );
}
