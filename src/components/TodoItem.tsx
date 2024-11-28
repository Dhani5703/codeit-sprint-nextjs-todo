// components/TodoItem.tsx

import React from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  toggleCompletion: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleCompletion }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompletion(todo.id)}
      />
      <span>{todo.text}</span>
    </div>
  );
};

export default TodoItem;
