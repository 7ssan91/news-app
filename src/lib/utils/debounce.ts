export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
) {
  let timeoutId: NodeJS.Timeout;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
