export interface User {
    isSelected: boolean;
    id: string;
    title: string;
    completed: string;
    isEdit: boolean;
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