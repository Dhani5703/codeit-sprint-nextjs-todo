// pages/index.tsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import { fetchTodoItems, createTodoItem } from '../services/todoService';

const Home = () => {
  const [todos, setTodos] = useState<any[]>([]); // 빈 배열로 초기화
  const [newTodo, setNewTodo] = useState('');
  const [tenantId, setTenantId] = useState('your-tenant-id'); // tenantId는 고정 값으로 설정하거나, 다른 방식으로 받으세요.

  // 할 일 목록 조회 함수
  const loadTodos = async () => {
    try {
      const fetchedTodos = await fetchTodoItems(tenantId, 1, 10); // tenantId와 페이지 정보를 API에 전달
      setTodos(fetchedTodos); // API에서 받은 데이터로 todos 상태 갱신
    } catch (error) {
      console.error('Failed to fetch todo items:', error);
    }
  };

  // 할 일 추가 함수
  const addTodo = async () => {
    if (!newTodo.trim()) return; // 입력값이 없으면 추가하지 않음

    const todoData = { name: newTodo }; // API에 전달할 데이터 구성
    try {
      const createdTodo = await createTodoItem(tenantId, todoData); // todo 추가 API 호출
      setTodos((prevTodos) => [...prevTodos, createdTodo]); // 새로 생성된 todo 항목을 추가
      setNewTodo(''); // 입력창 초기화
    } catch (error) {
      console.error('Failed to create todo item:', error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 할 일 목록을 불러옴
  useEffect(() => {
    loadTodos();
  }, [tenantId]);

  return (
    <div>
      <Header />
      <div className="todo-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') addTodo();
          }}
          placeholder="할 일을 입력하세요"
        />
        <button onClick={addTodo}>추가하기</button>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default Home;
