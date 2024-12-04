import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // API 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const tenantId = process.env.NEXT_PUBLIC_TENANT_ID as string; // 테넌트 ID

export default apiClient;
