export interface IStringIndexable {
  [key: string]: any
}

export interface IConstructable<T = any> {
  new (...args: any[]): T
}
