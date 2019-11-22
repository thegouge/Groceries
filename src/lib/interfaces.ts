export interface User {
  accessId: string;
  admin: boolean;
  name: string;
  userId: number;
}

export interface CategoryClass {
  id: number;
  name: string;
  color: string;
  // icon: any;
}

export interface Item {
  id: number;
  catId: number;
  name: string;
  quantity: string;
  isChecked: boolean;
}
