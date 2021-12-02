import { Task } from "../types/interface";

class TaskModel {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  public getAllTask = (): Task[] => {
    return this.tasks;
  };

  private sortTask = (): void => {
    const endIndex = this.tasks.length - 1;
    const array = this.tasks;
    for (let i: number = endIndex; i > 0; i--) {
      if (array[i]["taskPriority"] < array[i - 1]["taskPriority"]) {
        this.swap(array, i, i - 1);
      } else if (array[i]["taskPriority"] === array[i - 1]["taskPriority"]) {
        if (array[i]["timeStamp"] < array[i - 1]["timeStamp"]) {
          this.swap(array, i, i - 1);
        }
      }
    }
  };

  private swap = (array: Task[], startIndex: number, endIndex: number): void => {
    [array[startIndex], array[endIndex]] = [array[endIndex], array[startIndex]];
  };

  public addTask = (task: Task): void => {
    this.tasks.push(task);
    if (this.tasks.length >= 2) {
      this.sortTask();
    }
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
