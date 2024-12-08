import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../components/Header";
import TodoList from "../components/TodoList";
import {
  fetchTodoItems,
  createTodoItem,
  updateTodoItem,
} from "../services/todoService";
import { tenantId } from "../utils/apiClient";
import { Todo } from "../types/types";
import { TodoItem } from "@/components/TodoItem";
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
        const mappedTodos = items.map((item: TodoItem) => ({
          id: item.id,
          name: item.name,
          completed: item.isCompleted,
        }));
        setTodos(mappedTodos);
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
        ...prevTodos,
        {
          id: createdTodo.id,
          name: createdTodo.name,
          completed: createdTodo.isCompleted,
        },
      ]);
      setNewTodo("");
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
  const viewTodoDetails = (itemId) => {
    router.push(`/items/${itemId}`); // 상세 페이지로 라우팅
  };

  return (
    <div className="min-h-screen bg-state-100 flex flex-col items-center">
      <Header />
      <div className="w-full max-w-4xl space-y-6 mt-6">
        {/* 입력 필드 */}
        <div className="flex items-center gap-4 w-full">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            placeholder="할 일을 입력하세요"
            className="text-gray-700 flex-grow p-3 border rounded-lg"
            style={{
              backgroundImage: "url('/search.png')",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%", 
              height: "56px"
            }}
          />
          <button
            onClick={addTodo}
            className="bg-center bg-no-repeat bg-contain w-[168px] h-[56px] p-2 rounded-lg"
            style={{
              backgroundImage: `url('${
                newTodo.trim()
                  ? "/Type=Add, Size=Large, State=Active.png"
                  : "/Type=Add, Size=Large, State=Default.png"
              }')`,
            }}
            disabled={!newTodo.trim()}
          ></button>
        </div>
  
        {/* TODO & DONE 리스트 */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6">
          {/* TODO 섹션 */}
          <div className="flex-1 rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex items-center h-10">
              <Image src="/todo.png" alt="TODO" width={100} height={36} />
            </div>
            {todos.filter((todo) => !todo.completed).length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-8">
                <Image
                  src="/Type=Todo, Size=Large.png"
                  alt="TODO Empty"
                  width={150}
                  height={150}
                />
                <p className="text-gray-700">
                  할 일이 없어요. TODO를 새롭게 추가해주세요!
                </p>
              </div>
            ) : (
              <TodoList
                todos={todos.filter((todo) => !todo.completed)}
                onToggleComplete={toggleTodoComplete}
                onViewDetails={viewTodoDetails}
              />
            )}
          </div>
  
          {/* DONE 섹션 */}
          <div className="flex-1 rounded-lg shadow-md p-6 flex flex-col">
            <div className="flex items-center h-10">
              <Image src="/done.png" alt="DONE" width={100} height={36} />
            </div>
            {todos.filter((todo) => todo.completed).length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-8">
                <Image
                  src="/Type=Done, Size=Large.png"
                  alt="DONE Empty"
                  width={150}
                  height={150}
                />
                <p className="text-gray-700 mt-4">
                  아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!
                </p>
              </div>
            ) : (
              <TodoList
                todos={todos.filter((todo) => todo.completed)}
                onToggleComplete={toggleTodoComplete}
                onViewDetails={viewTodoDetails}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default Home;
