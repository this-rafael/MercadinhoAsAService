export interface ToPrisma {
  toPrisma<T = Record<string, any>>(): T;
}
