export interface CategoryClass {
  id: number;
  name: string;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  quantity: string;
  isChecked: boolean;
}
