import React from 'react'
import './ToDoCard.css'

interface ToDoCardProps {
  title: string;
  content: string;
}

export default function ToDoCard({ title, content }: ToDoCardProps) {
  return (
    <div className='todo-card'>
      <div className='todo-card-header'>
        <h4>{title}</h4> {/* Använd props för att visa titeln */}
      </div>
      <div className='todo-card-content'>
        <p>{content}</p> {/* Använd props för att visa innehållet */}
      </div>
    </div>
  );
}
