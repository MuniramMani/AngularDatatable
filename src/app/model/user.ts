//import { title } from "process";

export class User {
    isSelected: boolean;
    id: string;
    title: string;
    completed: string;
    isEdit: boolean;

    constructor(isSelected, id, title, completed, isEdit) 
    {      
      this.isSelected = isSelected;
      this.id = id;
      this.title = title;
      this.completed = completed;
      this.isEdit = isEdit;
  
    }
}
  
export const UserColumns = [
    {
      key: 'isSelected',
      type: 'isSelected',
      label: '',
    },
    {
        key: 'id',
        type: 'text',
        label: 'ID',
      },
    {
      key: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      key: 'completed',
      type: 'text',
      label: 'Completed',
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
];

export interface Product {
  id?: number;
  title: string;
  completed: string;
  checked?: boolean;
  isSelected: boolean;    
  isEdit: boolean;
}