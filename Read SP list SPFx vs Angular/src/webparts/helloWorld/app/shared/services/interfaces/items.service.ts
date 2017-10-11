import { ItemModel } from "./../../models";

export interface IItemsService {
  getItems(): Promise<ItemModel[]>;
}
