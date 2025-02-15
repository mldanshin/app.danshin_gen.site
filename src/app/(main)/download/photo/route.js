import { getPhoto } from "@/services/download";
import { getServerToken } from '@/lib/auth';

/**
 * request: Запрос добавлен для исключения статической генарации во время сборки проекта
 */
export async function GET(request) {
    const token = await getServerToken();
    return getPhoto(token);
}
