// components/TodoList.tsx
import React from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodoCompletion: (id: string, completed: boolean) => void;
  removeTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodoCompletion, removeTodo }) => {
    if (!todos || todos.length === 0) {
        return <div>No todos available.</div>; // 항목이 없을 때 메시지 출력
      }
    return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodoCompletion(todo.id, !todo.completed)}
          />
          {todo.title}
          <button onClick={() => removeTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
