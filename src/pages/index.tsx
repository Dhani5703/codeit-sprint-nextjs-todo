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

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
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
        console.error("Failed to fetch todos:", error);
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
      setNewTodo("");
    } catch (error) {
      console.error("Failed to create todo item:", error);
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
      console.error("Failed to update todo item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <Header />
      <div className="w-full max-w-4xl space-y-6">
        {/* 입력 필드 */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            placeholder="할 일을 입력하세요"
            className="w-full px-4 py-2 rounded-lg text-gray-700"
            style={{
              backgroundImage: "url('/search.png')", // 저장된 PNG 파일
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover", // 배경 이미지가 입력창에 맞게 조정
              color: "#333", // 텍스트 색상
              height: "60px", // 입력창 높이
              paddingLeft: "20px", // 텍스트 간격
              border: "none", // 외곽선 제거
            }}
          />
          <button
            onClick={addTodo}
            className="h-12 w-20 md:h-16 md:w-24 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url('${
                newTodo.trim()
                  ? "/Type=Add, Size=Large, State=Active.png"
                  : "/Type=Add, Size=Large, State=Default.png"
              }')`,
              height: "20px", // 버튼 높이
              width: "70px", // 버튼 너비
              backgroundSize: "60px", // 배경 이미지 크기
            }}
            disabled={!newTodo.trim()} // 입력값 없을 경우 버튼 비활성화
          ></button>
        </div>

        {/* TODO & DONE 리스트 */}
        <div className="flex gap-8">
          {/* TODO 섹션 */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-500">TO DO</h2>
            {todos.filter((todo) => !todo.completed).length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-8">
                <Image src="/Type=Todo, Size=Large.png" alt="TODO Empty" width={150} height={150} />
                <p className="text-gray-500 mt-4">할 일이 없어요. TODO를 새롭게 추가해주세요!</p>
              </div>
            ) : (
              <TodoList
                todos={todos.filter((todo) => !todo.completed)}
                onToggleComplete={toggleTodoComplete}
              />
            )}
          </div>

          {/* DONE 섹션 */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-green-700">DONE</h2>
            {todos.filter((todo) => todo.completed).length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-8">
                <Image src="/Type=Done, Size=Large.png" alt="DONE Empty" width={150} height={150} />
                <p className="text-gray-500 mt-4">아직 다 한 일이 없어요. 해야 할 일을 체크해보세요!</p>
              </div>
            ) : (
              <TodoList
                todos={todos.filter((todo) => todo.completed)}
                onToggleComplete={toggleTodoComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
