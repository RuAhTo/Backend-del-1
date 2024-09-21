import React from 'react'
import './ToDoCard.css'

interface ToDoCardProps {
  title: string;
  content: string;
  color: number;
}

export default function ToDoCard({ title, content, color }: ToDoCardProps) {
  console.log(`Card: ${title}`);
  return (
    <div className='todo-card' style={{ backgroundColor: `color-${color}` }}> {/* Använd en stil eller klass baserat på färg */}
      <div className='todo-card-header'>
          <h4>{title}</h4>
      </div>
      <div className='todo-card-content'>
          <p>{content}</p>
      </div>
    </div>
);
}