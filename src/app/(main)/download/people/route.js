import getPeople from "@/repositories/download/people.js";

/**
 * request: Запрос добавлен для исключения статической генарации во время сборки проекта
 */
export async function GET(request) {
    return getPeople();
}
