import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import MainHeader from "../components/MainHeader";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import './MainPage.css'
import '../index.css'

interface Todo {
    id: number;
    title: string;
    content: string;
    color: number;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    authorId: number;
}

export default function MainPage() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleDragEnd = async (event: DragEndEvent): Promise<void> => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        // Kontrollera om overId är en giltig status
        const validStatuses: Todo['status'][] = ['TODO', 'IN_PROGRESS', 'DONE'];
        if (!validStatuses.includes(overId as Todo['status'])) {
            console.error('Invalid status:', overId);
            return;
        }

        // Om kortet dras till en ny kategori (status)
        if (activeId !== overId) {
            const oldTodo = todos.find(todo => todo.id.toString() === activeId);
            const newStatus = overId as 'TODO' | 'IN_PROGRESS' | 'DONE'; // Validerad status

            if (oldTodo) {
                // Uppdatera status i state, resten av todo-objektet förblir oförändrat
                const updatedTodo: Todo = { ...oldTodo, status: newStatus };

                setTodos(todos.map(todo =>
                    todo.id.toString() === activeId ? updatedTodo : todo
                ));

                try {
                    const response = await fetch(`http://localhost:3000/dnd_todo/todos/${updatedTodo.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: updatedTodo.status }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Todo updated:', data, `Todo ${updatedTodo.id} has been updated to ${newStatus}`);
                    } else {
                        const errorData = await response.json();
                        console.error('Error updating todo:', errorData);
                        throw new Error('Failed to update todo status.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        }
    }

    const fetchTodos = async (): Promise<void> => {
        try {
            const token = localStorage.getItem('token'); // Hämta token från localStorage
    
            if (!token) {
                throw new Error("No token found. Please log in.");
            }
    
            const response = await fetch('http://localhost:3000/dnd_todo/todos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Skicka token i Authorization-header
                },
            });
    
            if (response.ok) {
                const data: Todo[] = await response.json();
                setTodos(data);
                console.log('Todos fetched successfully', data);
            } else {
                throw new Error('Failed to fetch todos');
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

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
