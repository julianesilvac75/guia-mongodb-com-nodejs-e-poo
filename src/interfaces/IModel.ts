interface IModel<T> {
  create(obj: T): Promise<T>,
  readOne(_id: string): Promise<T | null>,
  read(): Promise<T[]>,
}
  
export default IModel;
