import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import { fetchTodoItems, createTodoItem } from '../services/todoService';

const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || ''; // .env에서 가져오기

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // 초기 데이터 로드
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const items = await fetchTodoItems(tenantId);
        setTodos(
          items.map((item) => ({
            id: item.id,
            text: item.name, // API 응답의 name 필드를 사용
            completed: item.isCompleted,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    loadTodos();
  }, []);

  // 할 일 추가 함수
  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const todoData = { name: newTodo };
    try {
      const createdTodo = await createTodoItem(tenantId, todoData);
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: createdTodo.id,
          text: createdTodo.name, // name 필드를 text로 매핑
          completed: createdTodo.isCompleted,
        },
      ]);
      setNewTodo('');
    } catch (error) {
      console.error('Failed to create todo item:', error);
    }
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
