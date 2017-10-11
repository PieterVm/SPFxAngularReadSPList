
export interface IItemModel {

    Title: string;
    Picture: {};
    Link: {};
  }

  export class ItemModel implements IItemModel {

    public Title: string;
    public Picture: {};
    public Link: {};



    constructor(obj?: IItemModel) {
      if (obj) {
        (<any>Object).assign(this, obj);
      }
    }
  }
