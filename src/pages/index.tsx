// pages/index.tsx

import React, { useState } from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';

// 임시 데이터
const initialTodos = [
  { id: 1, text: 'Next.js 배우기', completed: false },
  { id: 2, text: '타입스크립트 연습하기', completed: false },
];

const Home = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [newTodo, setNewTodo] = useState('');

  // 할 일 추가 함수
  const addTodo = (text: string) => {
    const newTodo = {
      id: todos.length + 1,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodo(''); // 입력창 초기화
  };

  return (
    <div>
      <Header />
      <div className="todo-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') addTodo(newTodo);
          }}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={() => addTodo(newTodo)}>추가하기</button>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default Home;
