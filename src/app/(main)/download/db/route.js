import { getDB } from "@/services/download.js";
import { getAccessToken } from '@/lib/cookies';
/**
 * request: Запрос добавлен для исключения статической генарации во время сборки проекта
 */
export async function GET(request) {
    const token = await getAccessToken();
    return getDB(token);
}
