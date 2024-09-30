import React from "react";
import ToDoCard from "./TodoCard/ToDoCard";
import { useDroppable } from "@dnd-kit/core";
import '../index.css';
import { FaTrash } from "react-icons/fa";

interface Todo {
    id: number;
    title: string;
    content: string;
    color: number;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}

interface CategoriesProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    isDragging: boolean; // Ny prop för att hålla koll på om något dras
}

const Droppable = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const { setNodeRef, isOver } = useDroppable({
        id,  // Här är id:t viktigt och ska vara samma som status
    });

    return (
        <div 
            ref={setNodeRef} 
            className={`drop-zone ${isOver ? 'over' : ''}`} // Visar "over"-klass när man drar över en zone
        >
            {children}
            {isOver && (
                <p className="drop-zone-text">Drop here!</p> // Visar texten om musen är över droppzonen
            )}
        </div>
    );
};

// Skapar en egen TrashZone komponent utan de vanliga drop-zone-klasserna
const TrashZone = () => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'TRASH', // Specifik id för trash-zonen
    });

    return (
        <div ref={setNodeRef} className={`trash-zone ${isOver ? 'over' : ''}`}>
            <FaTrash className={`trash-zone-icon`} />
            <p className="trash-zone-text">Släpp här för att radera</p>
        </div>
    );
};

export default function Categories({ todos, isDragging }: CategoriesProps) {
    return (
        <>
            <div className="todo-status-container status-container">
                <div className="status-header">
                    <h2>To Do</h2>
                </div>
                <Droppable id="TODO">  {/* Drop zone för "todo" */}
                    <div className="status-content">
                        {todos.filter(todo => todo.status === 'TODO').map(todo => (
                            <ToDoCard key={todo.id} id={todo.id} title={todo.title} content={todo.content} color={todo.color} />
                        ))}
                    </div>
                </Droppable>
            </div>

            <div className="in-progress-status-container status-container">
                <div className="status-header">
                    <h2>In Progress</h2>
                </div>
                <Droppable id="IN_PROGRESS">  {/* Drop zone för "in-progress" */}
                    <div className="status-content">
                        {todos.filter(todo => todo.status === 'IN_PROGRESS').map(todo => (
                            <ToDoCard key={todo.id} id={todo.id} title={todo.title} content={todo.content} color={todo.color} />
                        ))}
                    </div>
                </Droppable>
            </div>

            <div className="done-status-container status-container">
                <div className="status-header">
                    <h2>Done</h2>
                </div>
                <Droppable id="DONE">  {/* Drop zone för "done" */}
                    <div className="status-content">
                        {todos.filter(todo => todo.status === 'DONE').map(todo => (
                            <ToDoCard key={todo.id} id={todo.id} title={todo.title} content={todo.content} color={todo.color} />
                        ))}
                    </div>
                </Droppable>
            </div>

            {/* Trash zone - visas bara när något dras */}
            {isDragging && <TrashZone />}
        </>
    );
}
