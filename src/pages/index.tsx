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
    <div className="min-h-screen bg-state-100 flex flex-col items-center p-6">
      <Header />
      <div className="w-full max-w-4xl space-y-6">
        {/* 입력 필드 */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            placeholder="할 일을 입력하세요"
            className="text-gray-700"
            style={{
              backgroundImage: "url('/search.png')", // 저장된 PNG 파일
              backgroundPosition: "center", // 배경 이미지가 중앙에 위치하도록 설정
              backgroundRepeat: "no-repeat", // 배경 이미지가 반복되지 않도록 설정
              backgroundSize: "contain", // 이미지 비율 유지하며 크기에 맞게 조정
              color: "#333", // 텍스트 색상
              height: "40px", // 이미지 크기에 맞춘 높이
              paddingLeft: "40px", // 이미지 크기와 일치하는 간격
              width: "600px", // 이미지 크기에 맞는 너비 설정 (원하는 크기에 맞게 조정)
              border: "none", // 외곽선 제거
            }}
          />
          <button
            onClick={addTodo}
            className="bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url('${
                newTodo.trim()
                  ? "/Type=Add, Size=Large, State=Active.png"
                  : "/Type=Add, Size=Large, State=Default.png"
              }')`,
              backgroundPosition: "center", // 배경 이미지가 중앙에 위치하도록 설정
              backgroundRepeat: "no-repeat", // 배경 이미지가 반복되지 않도록
              backgroundSize: "contain", // 이미지 크기
              height: "40px", // 버튼 높이를 입력창 높이에 맞게 조정
              width: "100px", // 버튼 너비
              padding: "15px",
              border: "none", // 외곽선 제거
            }}
            disabled={!newTodo.trim()}
          ></button>
        </div>
        {/* TODO & DONE 리스트 */}
        <div className="flex gap-8">
          {/* TODO 섹션 */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div>
              <Image src="/todo.png" alt="TODO" />
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
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div>
              <Image src="/done.png" alt="done" />
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
