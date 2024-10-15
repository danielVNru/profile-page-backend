/**
 * Обёртка для любого промиса, которая возвращает [результат, ошибка]
 * @param promise - Промис для обработки
 * @returns Массив [данные, ошибка]
 */
export async function wrap<T>(promise: Promise<T>): Promise<[T | null, any]> {
  try {
    const result = await promise;
    return [result, null];
  } catch (error) {
    console.log(error)    
    return [null, error];
  }
}
