import { getPhoto } from "@/services/download";
import { getAccessToken } from '@/lib/cookies';

/**
 * request: Запрос добавлен для исключения статической генарации во время сборки проекта
 */
export async function GET(request) {
    const token = await getAccessToken();
    return getPhoto(token);
}
