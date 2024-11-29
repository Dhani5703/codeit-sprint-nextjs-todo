// src/services/todoService.ts
import apiClient from '../utils/apiClient';
import { tenantId } from '../utils/apiClient';

//export const tenantId = process.env.NEXT_PUBLIC_TENANT_ID; // 테넌트 ID

/**
 * Todo 항목 등록 API
 * @param todoData - 등록할 Todo 데이터 (title, description 등)
 */
export const createTodoItem = async (tenantId: string, todoData: { name: string }) => {
    try {
      const response = await apiClient.post(`/${tenantId}/items`, todoData); // 백틱 사용
      console.log('추가된 todo: ',response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating todo item:', error);
      throw error;
    }
  };

/**
 * Todo 항목 목록 조회 API
 * @param page - 현재 페이지 번호 (기본값: 1)
 * @param pageSize - 한 페이지 당 보여줄 항목 수 (기본값: 10)
 */
export const fetchTodoItems = async (tenantId: string, page = 1, pageSize = 10) => {
  const response = await apiClient.get(`/${tenantId}/items`, {
    params: { page, pageSize },
  });
  console.log('todo 목록: ',response.data);
  return response.data;
};

/**
 * Todo 항목 상세 조회 API
 * @param tenantId - 조회할 테넌트 ID
 * @param itemId - 조회할 Todo 항목의 ID
 */
export const fetchTodoItemById = async (tenantId: string, itemId: number) => {
  if (!tenantId || !itemId) {
    throw new Error('Invalid tenantId or itemId');
  }
  try {
    const response = await apiClient.get(`/${tenantId}/items/${itemId}`);
    console.log('상세 조회:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch todo item details:', error);
    throw error;
  }
};

 /**
  * Todo 항목 수정 API(상태 변경)
  * @param itemId - 수정할 Todo 항목의 ID
  * @param updatedData - 수정할 데이터 (title, description, status 등)
  */
 export const updateTodoItem = async (
   itemId: number,
   updatedData: { isCompleted: boolean }
 ) => {
   const response = await apiClient.patch(`/${tenantId}/items/${itemId}`, updatedData);
   return response.data;
 };

/**
 * Todo 항목 삭제 API
 * @param itemId - 삭제할 Todo 항목의 ID
 */
export const deleteTodoItem = async (
  tenantId: string,
  itemId: number) => {
  const response = await apiClient.delete(`/${tenantId}/items/${itemId}`);
  return response.data;
};
