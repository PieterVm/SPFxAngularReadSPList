import { Injectable } from "@angular/core";
import { IItemsService } from "./../../services/interfaces/items.service";
import { ItemModel } from "./../../models";

@Injectable()
export class MockItemsService implements IItemsService {
  private readonly MOCK_DELAY: number = 1000;

  public async getItems(): Promise<ItemModel[]> {
    return new Promise<ItemModel[]>((resolve, reject) => {
      const items: ItemModel[] = [
        { Title: "Mauris", Picture: {Url: "http://fakeimg.pl/300"}, Link: {Url: "www.google.be"} },
        { Title: "Sed", Picture : {Url: "http://fakeimg.pl/300"}, Link: {Url: "www.google.be"} },
        { Title: "Quisque", Picture: {Url: "http://fakeimg.pl/300"}, Link: {Url: "www.google.be"}}
      ];

      setTimeout(() => {
        resolve(items);
      }, this.MOCK_DELAY);
    });
  }
}
