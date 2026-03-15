export interface TodoListItem {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoList {
  id: number;
  title: string;
  item: TodoListItem[];
}
