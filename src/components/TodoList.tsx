import React from 'react';
import TodoItem from './TodoItem'; // TodoItem 컴포넌트 임포트

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
    <div className="todo-list p-4">
      {todos.map((todo) => (
        <div key={todo.id} className="mb-4"> {/* 각 항목에 간격 추가 */}
          <TodoItem
            id={todo.id}
            text={todo.text}
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
