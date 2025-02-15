import { getDB } from "@/services/download.js";
import { getServerToken } from '@/lib/auth';
/**
 * request: Запрос добавлен для исключения статической генарации во время сборки проекта
 */
export async function GET(request) {
    const token = await getServerToken();
    return getDB(token);
}
