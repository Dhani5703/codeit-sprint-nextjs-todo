// pages/todo/[itemId].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTodoItemById, updateTodoItem, deleteTodoItem, uploadImage } from '../../services/todoService';
import { tenantId } from '../../utils/apiClient';
import Header from '../../components/Header';
import TodoItem from '../../components/TodoItem'; // TodoItem 임포트

const TodoDetailPage = () => {
  const [todo, setTodo] = useState<any>(null);  // 초기 상태를 null로 설정
  const [editedMemo, setEditedMemo] = useState<string>('');
  const router = useRouter();
  const { itemId } = router.query;

  // 상세 항목 데이터 로드
  useEffect(() => {
    if (!itemId) return;

    const loadTodo = async () => {
      try {
        const todoDetails = await fetchTodoItemById(tenantId, Number(itemId));
        setTodo(todoDetails);
        setEditedMemo(todoDetails.memo);
      } catch (error) {
        console.error('Failed to fetch todo item details:', error);
      }
    };

    loadTodo();
  }, [itemId]);

  // 완료 여부 토글
  const toggleCompletion = async (id: string, isCompleted: boolean) => {
    if (!todo) return;
    try {
      const updatedTodo = await updateTodoItem(Number(itemId), { isCompleted: !isCompleted });
      setTodo(updatedTodo);
      alert('완료 상태가 업데이트되었습니다.');
    } catch (error) {
      console.error('Failed to update completion status:', error);
      alert('완료 상태 수정에 실패했습니다.');
    }
  };

  // 상세 페이지에서 메모 항목을 수정하는 부분
  const handleUpdate = async () => {
    if (!todo) return;
    
    try {
      const updatedItem = await updateTodoItem(Number(itemId), { memo: editedMemo });
      setTodo(updatedItem);  // 수정된 항목을 todo 상태에 반영
      alert('메모가 수정되었습니다.');
    } catch (error) {
      console.error("Error updating todo item:", error);
      alert('메모 수정에 실패했습니다.');
    }
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedMemo(e.target.value);  // 메모를 변경할 때마다 memo 상태 업데이트
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const uploadedImageUrl = await uploadImage(file);
        setTodo((prevTodo: any) => ({
          ...prevTodo,
          imageUrl: uploadedImageUrl,  // imageUrl을 업데이트
        }));
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  // 삭제
  const handleDelete = async () => {
    if (!itemId) return;

    try {
      await deleteTodoItem(tenantId, Number(itemId));
      alert('할 일이 삭제되었습니다.');
      router.push('/'); // 목록 페이지로 이동
    } catch (error) {
      console.error('Failed to delete todo item:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  if (!todo) return <div>Loading...</div>;  // todo가 로드되기 전에 렌더링 하지 않도록 방지

  return (
    <div>
      <Header />
      <div>
        {/* TodoItem 컴포넌트를 사용하여 해당 항목 렌더링 */}
        <TodoItem
          id={todo.id}
          text={todo.name}
          completed={todo.isCompleted}
          onToggleComplete={toggleCompletion}
        />
      </div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          {/* 이미지 업로드 칸 */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">이미지 업로드</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2"
            />
            {todo.imageUrl && (
              <img
                src={todo.imageUrl}
                alt="Uploaded"
                className="mt-4 max-w-full h-auto"
              />
            )}
          </div>
          <div className="w-full md:w-2/3 ml-0 md:ml-8">
            <h2 className="text-xl font-semibold mb-4">메모</h2>
            <textarea
              id="memo"
              value={editedMemo || ''}
              onChange={handleMemoChange}
              rows={4}
              cols={40}
              style={{ display: 'block', marginTop: '8px' }}
            />
            <button onClick={handleUpdate} style={{ marginTop: '8px' }}>
              수정 완료
            </button>
          </div>
        </div>
        <button onClick={handleDelete} style={{ marginTop: '16px', color: 'red' }}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default TodoDetailPage;
