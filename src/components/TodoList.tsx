// components/TodoList.tsx
import React from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onViewDetails: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onViewDetails }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <p key={todo.id} className="todo-item flex justify-between items-center mb-2 p-2 border-b">
          <input
            type="checkbox"
            checked={todo.completed} // 완료된 상태일 경우 체크 표시
            onChange={() => onToggleComplete(todo.id, todo.completed)} // 체크박스 클릭 시 완료 상태 변경
            className="mr-2"
          />
          <span
            onClick={() => onViewDetails(todo.id)} // 할 일 클릭 시 상세 페이지로 이동
            className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
          >
            {todo.text}
          </span>
        </p>
      ))}
    </div>
  );
};

export default TodoList;
