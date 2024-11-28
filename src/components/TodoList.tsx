import React from 'react';
import TodoItem from './TodoItem';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  // 할 일 상태 토글 함수 (진행 중 / 완료)
  const toggleCompletion = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos); // 상태 업데이트
  };

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleCompletion={toggleCompletion} />
      ))}
    </div>
  );
};

export default TodoList;
