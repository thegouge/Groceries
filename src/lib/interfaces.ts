export interface CategoryClass {
  id: number;
  name: string;
  items: Item[];
  // color: string;
  // icon: any;
}

export interface Item {
  id: number;
  catId: number;
  name: string;
  quantity: string;
  isChecked: boolean;
}
