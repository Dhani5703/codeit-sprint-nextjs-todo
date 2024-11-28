// src/services/todoService.ts
import apiClient from '../utils/apiClient';

export const tenantId = process.env.NEXT_PUBLIC_TENANT_ID; // 테넌트 ID

/**
 * Todo 항목 등록 API
 * @param todoData - 등록할 Todo 데이터 (title, description 등)
 */
export const createTodoItem = async (tenantId: string, todoData: { name: string }) => {
    try {
      const response = await apiClient.post(`/${tenantId}/items`, todoData); // 백틱 사용
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
  return response.data;
};

/**
 * Todo 항목 상세 조회 API
 * @param itemId - 조회할 Todo 항목의 ID
 */
export const fetchTodoItemById = async (itemId: string) => {
  const response = await apiClient.get(`/items/${itemId}`);
  return response.data;
};

/**
 * Todo 항목 수정 API
 * @param itemId - 수정할 Todo 항목의 ID
 * @param updatedData - 수정할 데이터 (title, description, status 등)
 */
export const updateTodoItem = async (
  itemId: string,
  updatedData: { title?: string; description?: string; status?: 'pending' | 'completed' }
) => {
  const response = await apiClient.patch(`/items/${itemId}`, updatedData);
  return response.data;
};

/**
 * Todo 항목 삭제 API
 * @param itemId - 삭제할 Todo 항목의 ID
 */
export const deleteTodoItem = async (itemId: string) => {
  const response = await apiClient.delete(`/items/${itemId}`);
  return response.data;
};
