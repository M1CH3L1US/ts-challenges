type Curry<T extends (...args: any[]) => any, V> = T extends (
  ...args: infer A
) => V
  ? A[0] extends undefined
    ? V
    : A extends [infer F, ...infer R]
    ? (arg: F) => Curry<(...args: R) => V, V>
    : never
  : never;

declare function Currying<
  T extends (...args: any[]) => any,
  V extends ReturnType<T>,
  R extends Curry<T, V>
>(fn: T): R;

function add(a: number, b: number) {
  return a + b;
}

const curried = Currying(add);
const res = curried(1)(2);
