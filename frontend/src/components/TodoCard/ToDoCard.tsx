import React from 'react'
import './ToDoCard.css'
import '../../index.css'

interface ToDoCardProps {
  title: string;
  content: string;
  color: number;
}

export default function ToDoCard({ title, content, color }: ToDoCardProps) {
  console.log(`Card: ${title}`);
  return (
    <div className='todo-card'> {/* Använd en stil eller klass baserat på färg */}
      <div className={`todo-card-header color-${color}`}>
          <h4>{title}</h4>
      </div>
      <div className='todo-card-content'>
          <p>{content}</p>
      </div>
    </div>
);
}