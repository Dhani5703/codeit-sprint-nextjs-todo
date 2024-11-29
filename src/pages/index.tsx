// pages/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import TodoList from '../components/TodoList'; // TodoList 컴포넌트 임포트
import {
  fetchTodoItems,
  createTodoItem,
  updateTodoItem
} from '../services/todoService';

import { tenantId } from '../utils/apiClient';

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
    try {
      const createdTodo = await createTodoItem(tenantId, { name: newTodo });
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: createdTodo.id, text: createdTodo.name, completed: createdTodo.isCompleted },
      ]);
      setNewTodo('');
    } catch (error) {
      console.error('Failed to create todo item:', error);
    }
  };

  // 완료 상태 토글
  const toggleTodoComplete = async (itemId: string, isCompleted: boolean) => {
    try {
      const updatedTodo = await updateTodoItem(itemId, { isCompleted: !isCompleted });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === itemId ? { ...todo, completed: updatedTodo.isCompleted } : todo
        )
      );
    } catch (error) {
      console.error('Failed to update todo item:', error);
    }
  };

  // 상세 페이지로 이동
  const viewTodoDetails = (itemId: string) => {
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
          className="border p-2 mb-4"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white p-2 mb-4">
          추가하기
        </button>

        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* 진행 중인 할 일 */}
          <div className="todo-list w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-4"> TODO </h2>
            <TodoList
              todos={todos.filter(todo => !todo.completed)} // 진행 중인 할 일 필터링
              onToggleComplete={toggleTodoComplete}
              onViewDetails={viewTodoDetails} // 상세보기 콜백 전달
            />
          </div>

          {/* 완료된 할 일 */}
          <div className="todo-list w-full md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-xl font-semibold mb-4"> DONE </h2>
            <TodoList
              todos={todos.filter(todo => todo.completed)} // 완료된 할 일 필터링
              onToggleComplete={toggleTodoComplete}
              onViewDetails={viewTodoDetails} // 상세보기 콜백 전달
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
