// components/TodoList.tsx
import React from 'react';

const TodoList = ({ todos, onViewDetails, onToggleComplete }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed} // 완료된 상태일 경우 체크 표시
            onChange={() => onToggleComplete(todo.id, todo.completed)} // 체크박스 클릭 시 완료 상태 변경
          />
          <span onClick={() => onViewDetails(todo.id)}>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
