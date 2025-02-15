import getPhoto from "@/repositories/download/photo.js";

/**
 * request: Запрос добавлен для исключения статической генарации во время сборки проекта
 */
export async function GET(request) {
    return getPhoto();
}
