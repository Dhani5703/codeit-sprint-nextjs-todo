import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // 라우팅을 위해 추가
import Header from '../components/Header';
import TodoList from '../components/TodoList';
import {
  fetchTodoItems,
  createTodoItem,
  fetchTodoItemById,
  updateTodoItem,
  deleteTodoItem,
} from '../services/todoService';

import { tenantId } from '../utils/apiClient';

//const tenantId = process.env.NEXT_PUBLIC_TENANT_ID || ''; // .env에서 tenantId 가져오기

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const router = useRouter();

  // 초기 데이터 로드
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const items = await fetchTodoItems(tenantId);
        const mappedTodos = items.map((item) => ({
          id: item.id,
          text: item.name,
          completed: item.isCompleted,
        }));
        setTodos(mappedTodos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };
    loadTodos();
  }, []);

  // 할 일 추가
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const todoData = { name: newTodo };
    try {
      const createdTodo = await createTodoItem(tenantId, todoData);
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: createdTodo.id, text: createdTodo.name, completed: createdTodo.isCompleted },
      ]);
      setNewTodo('');
    } catch (error) {
      console.error('Failed to create todo item:', error);
    }
  };

  // 상세 페이지로 이동
  const viewTodoDetails = (itemId) => {
    router.push(`/items/${itemId}`); // 상세 페이지로 라우팅
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
        <TodoList
          todos={todos}
          onViewDetails={viewTodoDetails} // 상세 보기 콜백
        />
      </div>
    </div>
  );
};

export default Home;
