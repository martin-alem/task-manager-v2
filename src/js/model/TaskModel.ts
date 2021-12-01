import { Task } from "../types/interface";

class TaskModel {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  public getAllTask = (): Task[] => {
    return this.tasks;
  };

  private sortTask = (): void => {};

  public addTask = (task: Task): void => {
    this.tasks.push(task);
  };

  public validateDescription = (description: string): boolean => {
    return description !== "";
  };

  public validateDuration = (duration: string): boolean => {
    if (duration === "") {
      return false;
    }
    const units: string[] = ["s", "m", "h"];
    duration = duration.replace(/\s/g, "");
    const charAtEnd: string = duration[duration.length - 1];
    const startChar: string = duration.split(charAtEnd)[0];
    const endsWithValidUnit: boolean = units.includes(charAtEnd);
    const startsWithValidNumber: boolean = !isNaN(parseInt(startChar));

    return endsWithValidUnit && startsWithValidNumber;
  };

  public validatePriority = (priority: string): boolean => {
    //It also handles the case where the input is empty.
    return !isNaN(parseInt(priority));
  };
}

export default TaskModel;
