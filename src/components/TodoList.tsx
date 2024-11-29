import React from 'react';

const TodoList = ({ todos, onViewDetails }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="todo-item"
          onClick={() => onViewDetails(todo.id)} // 항목 클릭 시 상세 페이지 이동
        >
          <span>{todo.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
