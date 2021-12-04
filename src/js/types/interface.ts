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

export enum TimerState {
  INACTIVE = "inactive",
  PAUSED = "paused",
  RUNNING = "running",
}
