export type RequestFunction = (...args: any[]) => Promise<any>;

export function wrapRequest<T>(
  requestFn: (...args: any[]) => Promise<T>
): (...args: any[]) => Promise<T | null> {
  return async function (...args: any[]): Promise<T | null> {
    try {
      const res = await requestFn(...args);
      console.log("успешный запрос");
      return res;
    } catch (error: any) {
      console.error(`Ошибка при выполнении запроса: ${error.message}`);
      console.error(error.stack);
      return null;
    }
  };
}
