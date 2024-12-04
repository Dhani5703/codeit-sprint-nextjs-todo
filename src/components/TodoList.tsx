import React from 'react';
import TodoItem from './TodoItem'; // TodoItem 컴포넌트 임포트
import { Todo } from '../types/types';


interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number, isCompleted: boolean) => void;
  onViewDetails: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onViewDetails }) => {
  return (
    <div className="todo-list p-4">
      {todos.map((todo) => (
        <div key={todo.id} className="mb-4"> {/* 각 항목에 간격 추가 */}
          <TodoItem
            id={todo.id}
            name={todo.name}
            completed={todo.completed}
            onToggleComplete={onToggleComplete}
            onViewDetails={onViewDetails}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
