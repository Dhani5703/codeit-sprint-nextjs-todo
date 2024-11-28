// components/TodoItem.tsx

import React from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const handleNavigateToDetail = () => {
    // 상세 페이지로 이동
    router.push(`/items/${todo.id}`);
  };

  return (
    <div className="todo-item flex items-center gap-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompletion(todo.id)}
      />
      {/* 할 일 텍스트를 클릭하면 상세 페이지로 이동 */}
      <span
        onClick={handleNavigateToDetail}
        className="cursor-pointer underline"
      >
        {todo.text}
      </span>
    </div>
  );
};

export default TodoItem;
