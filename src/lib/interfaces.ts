export interface User {
  accessId: string;
  admin: boolean;
  name: string;
}

export interface CategoryClass {
  id: number;
  name: string;
  color: string;
  list: ItemClass[];
  // icon: any;
}

export interface ItemClass {
  id: number;
  name: string;
  quantity: string;
  isChecked: boolean;
}

export interface FireItem {
  id: number;
  catId: number;
  name: string;
  quantity: string;
}
