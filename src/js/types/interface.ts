export interface EventHandler {
  [key: string]: (event: Event) => void;
}

export interface Task {
  taskId: string;
  taskDescription: string;
  taskDuration: string;
  taskPriority: number;
  timeStamp: number;
}
