import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import TodoInput from "../components/TodoInput";
import TodoSection from "../components/TodoSection";
import {
  fetchTodoItems,
  createTodoItem,
  updateTodoItem,
} from "../services/todoService";
import { tenantId } from "../utils/apiClient";
import { Todo } from "../types/types";
import "../app/globals.css";

const safeTenantId = tenantId as string;

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const router = useRouter();

  // 초기 데이터 로드
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const items = await fetchTodoItems(safeTenantId || "");
        const mappedTodos = items.map((item) => ({
          id: item.id,
          name: item.name,
          completed: item.isCompleted,
        }));
        setTodos(mappedTodos);
        console.log(mappedTodos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    loadTodos();
  }, []);

  // 할 일 추가
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const createdTodo = await createTodoItem(safeTenantId, { name: newTodo });
      setTodos((prevTodos) => [
        {
          id: createdTodo.id,
          name: createdTodo.name,
          completed: createdTodo.isCompleted,
        },
        ...prevTodos,
      ]);
      setNewTodo("");
      console.log(setTodos);
    } catch (error) {
      console.error("Failed to create todo item:", error);
    }
  };

  // 완료 상태 토글
  const toggleTodoComplete = async (itemId: number, isCompleted: boolean) => {
    try {
      const updatedTodo = await updateTodoItem(Number(itemId), {
        isCompleted: !isCompleted,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === Number(itemId)
            ? { ...todo, completed: updatedTodo.isCompleted }
            : todo,
        ),
      );
    } catch (error) {
      console.error("Failed to update todo item:", error);
    }
  };

  // 상세 페이지로 이동
  const viewTodoDetails = (itemId: number) => {
    router.push(`/items/${itemId}`);
  };

  return (
    <div className="min-h-screen bg-state-100 flex flex-col items-center">
      <Header />
      <div className="w-full max-w-4xl space-y-6 mt-6">
        {/* 입력 필드 */}
        <TodoInput
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
        />

        {/* TODO & DONE 리스트 */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6">
          {/* TODO 섹션 */}
          <TodoSection
            title="TODO"
            todos={todos.filter((todo) => !todo.completed)}
            onToggleComplete={toggleTodoComplete}
            onViewDetails={viewTodoDetails}
          />

          {/* DONE 섹션 */}
          <TodoSection
            title="DONE"
            todos={todos.filter((todo) => todo.completed)}
            onToggleComplete={toggleTodoComplete}
            onViewDetails={viewTodoDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
