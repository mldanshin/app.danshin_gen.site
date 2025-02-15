import getDB from "@/repositories/download/db.js";
/**
 * request: Запрос добавлен для исключения статической генарации во время сборки проекта
 */
export async function GET(request) {
    return getDB();
}
