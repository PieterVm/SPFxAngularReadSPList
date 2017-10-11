import { Component, Inject } from "@angular/core";

import { ItemsService } from "./../shared/services";
import { ItemModel } from "./../shared/models";


@Component({
  selector: "home",
  template: require("./home.template.html") as string,
  styles: [`
  a {
  text-decoration: none;
  }
  img {
  float: left;
  }
  .space {
  float: left;
  margin-left: 5px;
  }
  `]
})
export class HomeComponent {

  private items: ItemModel[] = [];
  constructor( @Inject(ItemsService) private itemsService: ItemsService) {
  }



  public ngOnInit() {
    this.itemsService.getItems().then((items: ItemModel[]) => {
       this.items = this.MakeArrayListItems(items);
    });
  }



  private MakeArrayListItems(items: ItemModel[]): ItemModel[] {
    let listWithItems: ItemModel[];
    let newItem: ItemModel;
    let counter: number;
    listWithItems = [];

    for (counter = 0; counter < items.length; counter++) {
      const listItem = items[Object.keys(items)[counter]];
      newItem = new ItemModel;

      if (listItem.hasOwnProperty("Title")) {
        newItem.Title = listItem.Title;
      }
      if (listItem.hasOwnProperty("Picture")) {
        if (listItem.Picture !== null) {
          if (listItem.Picture.hasOwnProperty("Url")) {
            newItem.Picture = listItem.Picture.Url;
          }
        }
      }
      if (listItem.hasOwnProperty("Link")) {
        if (listItem.Link !== null) {
          if (listItem.Link.hasOwnProperty("Url")) {
            newItem.Link = listItem.Link.Url;
          }
        }
      }

      listWithItems.push(newItem);
    }
    return listWithItems;

  }

}
