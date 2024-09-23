import React from 'react';
import './ToDoCard.css';
import { useDraggable, DragEndEvent } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface ToDoCardProps {
    id: number;
    title: string;
    content: string;
    color: number;
}



export default function ToDoCard({ id, title, content, color }: ToDoCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: id.toString(),
    });

//     const handleDragEnd = (event: DragEndEvent) => {
//       const { active, over } = event;
  
//       if (over) {
//           const oldTodo = todos.find(todo => todo.id === Number(active.id));
//           const newStatus = over.id; // Detta ID ska matcha kategorins ID
  
//           if (oldTodo && newStatus) {
//               setTodos(todos.map(todo =>
//                   todo.id === oldTodo.id ? { ...todo, status: newStatus as 'todo' | 'in-progress' | 'done' } : todo
//               ));
//           }
//       }
//   };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`todo-card ${isDragging ? 'dragging' : ''}`} // Lägg till klassen vid dragning
            style={{ transform: CSS.Translate.toString(transform) }}
        >
            <div className={`todo-card-header color-${color}`}>
                <h4>{title}</h4>
            </div>
            <div className='todo-card-content'>
                <p>{content}</p>
            </div>
        </div>
    );
}
