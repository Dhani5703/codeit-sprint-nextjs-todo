import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  fetchTodoItemById,
  updateTodoItem,
  deleteTodoItem,
  uploadImage,
} from "../../services/todoService";
import { tenantId } from "../../utils/apiClient";
import Header from "../../components/Header";
import TodoItem from "../../components/TodoItem";
import "../../app/globals.css";

const TodoDetailPage = () => {
  const [todo, setTodo] = useState<any>(null); // 초기 상태를 null로 설정
  const [editedName, setEditedName] = useState<string>(""); 
  const [editedMemo, setEditedMemo] = useState<string>(""); 
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false); 
  const [isMemoChanged, setIsMemoChanged] = useState<boolean>(false);
  const router = useRouter();
  const { itemId } = router.query;

  // 상세 항목 데이터 로드
  useEffect(() => {
    if (!itemId) return;

    const loadTodo = async () => {
      try {
        const todoDetails = await fetchTodoItemById(tenantId, Number(itemId));
        setTodo(todoDetails);
        setEditedName(todoDetails.name);
        setEditedMemo(todoDetails.memo);
      } catch (error) {
        console.error("Failed to fetch todo item details:", error);
      }
    };

    loadTodo();
  }, [itemId]);

  // 완료 여부 토글
  const toggleCompletion = async (id: number, isCompleted: boolean) => {
    if (!todo) return;
    try {
      const updatedTodo = await updateTodoItem(Number(itemId), {
        isCompleted: !isCompleted,
      });
      setTodo(updatedTodo);
      alert("완료 상태가 업데이트되었습니다.");
    } catch (error) {
      console.error("Failed to update completion status:", error);
      alert("완료 상태 수정에 실패했습니다.");
    }
  };

  // 이름 수정 처리
  const handleNameChange = (newName: string) => {
    setEditedName(newName);
    setIsNameChanged(newName !== todo?.name); // 이름이 변경되었는지 확인
  };

  // 메모 수정 처리
  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedMemo(e.target.value);
    setIsMemoChanged(e.target.value !== todo?.memo); // 메모가 변경되었는지 확인
  };

  // 수정 완료
  const handleUpdate = async () => {
    if (!todo) return;

    console.log("수정하려는 데이터:", {
      name: editedName,
      memo: editedMemo,
      imageUrl: todo.imageUrl,
    });

    try {
      const updatedItem = await updateTodoItem(Number(itemId), {
        name: editedName || todo.name, // name이 비어있으면 기존 name 값 사용
        memo: editedMemo || "", //비어있으면 빈 문자열
        imageUrl: todo.imageUrl || "", // 업로드된 이미지 URL, 없으면 빈 문자열
      });
      setTodo(updatedItem);
      alert("할 일이 수정되었습니다.");
      router.push("/"); // 홈 페이지로 이동
    } catch (error) {
      console.error("Error updating todo item:", error);
      alert("할 일 수정에 실패했습니다.");
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 이름이 영어로만 이루어졌는지 확인
      const fileName = file.name;
      const fileNameRegex = /^[a-zA-Z0-9._,\-/]+$/;
      if (!fileNameRegex.test(fileName)) {
        alert("이미지 파일 이름은 영문자만 포함됩니다.");
        return;
      }
      // 파일 크기가 5MB 이하인지 확인
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("파일 크기는 5MB 이하로 업로드해 주세요.");
        return;
      }

      try {
        const uploadedImageUrl = await uploadImage(tenantId, file);
        setTodo((prevTodo: any) => ({
          ...prevTodo,
          imageUrl: uploadedImageUrl, // imageUrl을 업데이트
        }));
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  // 삭제
  const handleDelete = async () => {
    if (!itemId) return;

    try {
      await deleteTodoItem(tenantId, Number(itemId));
      alert("할 일이 삭제되었습니다.");
      router.push("/"); // 목록 페이지로 이동
    } catch (error) {
      console.error("Failed to delete todo item:", error);
      alert("삭제에 실패했습니다.");
    }
  };

  if (!todo) return <div>Loading...</div>; // todo가 로드되기 전에 렌더링 하지 않도록 방지

  return (
    <div className="min-h-screen bg-state-100 flex flex-col items-center">
      <Header />
      <div className="bg-white p-6 flex-1 w-full max-w-4xl space-y-6 mx-auto">
        <div className="flex justify-center w-full">
          <div className="w-full">
            <TodoItem
              id={todo.id}
              name={editedName} // 이름을 상태에서 가져옴
              completed={todo.isCompleted}
              onToggleComplete={toggleCompletion}
              onEditName={handleNameChange} // 이름 수정 콜백
              isDetailPage={true}
              isEditable={true}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          {/* 이미지 업로드 칸 */}
          <div className="relative md:w-2/5 h-48 bg-state-100 border-4 border-dashed border-state-300 flex justify-center items-center rounded-lg mb-4 md:mb-0 min-h-full">
            {/* 이미지 추가 버튼: "Type=Edit.png"를 클릭해야 업로드 */}
            {!todo.imageUrl && (
              <div className="absolute inset-0 flex justify-center items-center">
                <Image
                  src="/img.png"
                  alt="Upload"
                  width={150}
                  height={150}
                  className="w-12 h-12 object-contain"
                />
                <Image
                  src="/Type=Plus.png" // 이미지 추가 버튼
                  alt="Edit"
                  width={45}
                  height={45}
                  className="absolute bottom-2 right-2 cursor-pointer" // 버튼을 클릭하여 이미지 추가
                  onClick={() => document.getElementById("imageInput")?.click()} // 클릭 시 input 요소 트리거
                />
              </div>
            )}
            {/* 이미지 업로드 시 실제 이미지가 표시될 부분 */}
            {todo.imageUrl && (
              <Image
                src={todo.imageUrl}
                alt="Uploaded"
                width={200}
                height={200}
                className="absolute top-0 left-0 object-cover rounded-lg"
              />
            )}
            {/* 파일 업로드 input */}
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          <div className="relative w-full h-48 md:w-3/5 md:ml-8 flex-grow min-h-full bg-[url('/memo.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">
            {/* 텍스트를 표시하는 영역 */}
            <div className="absolute top-2 text-amber font-bold z-10">Memo</div>
            {/* 입력 영역 */}
            <textarea
              id="memo"
              value={editedMemo || ""}
              onChange={handleMemoChange} // 메모 변경
              rows={10}
              cols={60}
              placeholder=""
              className="w-full h-3/5 mt-auto p-4 rounded-lg border-none outline-none bg-transparent text-black text-center z-0"
            />
          </div>
        </div>
        {/* 수정 및 삭제 버튼 */}
        <div className="flex justify-end mt-4 md:mt-8 gap-4">
          <div className="flex w-full justify-end">
            <Image
              src={`/Edit, Large, ${isMemoChanged || isNameChanged ? "Active" : "Default"}.png`}
              alt="수정완료"
              className="cursor-pointer mt-4"
              width={168}
              height={56}
              onClick={handleUpdate}
            />
            <Image
              src="/Delete, Large, Default.png"
              alt="delete"
              width={168}
              height={56}
              className="cursor-pointer mt-4 ml-2"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;
