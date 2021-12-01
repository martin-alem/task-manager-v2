import TaskView from "../view/TaskView";
import { getDateComponents } from "../utils/util";
import { EventHandler } from "../types/interface";
import TaskModel from "../model/TaskModel";

class TaskController {
  private taskView: TaskView = new TaskView();
  private taskModel: TaskModel = new TaskModel();

  private updateDayOfWeek = (): void => {
    const dayOfWeek: string = getDateComponents()[1];
    this.taskView.setDayOfWeek(dayOfWeek);
  };

  private updateMonthOfYear = (): void => {
    const dateAndMonth: string = `${getDateComponents()[2]}, ${getDateComponents()[0].padStart(2, "0")}`;
    this.taskView.setMonthOfYear(dateAndMonth);
  };

  private openModal = (event: Event): void => {
    event.preventDefault();
    this.taskView.toggleOverlay();
    this.taskView.getTaskModal().classList.remove("hide");
  };

  private closeModal = (event: Event): void => {
    event.preventDefault();
    this.taskView.toggleOverlay();
    this.taskView.getTaskModal().classList.add("hide");
  };

  private submitTask = (event: Event): void => {
    event.preventDefault();
    const taskDescription: string = this.taskView.getTaskDescription();
    const taskDuration: string = this.taskView.getTaskDuration();
    const taskPriority: string = this.taskView.getTaskPriority();

    const validateDescription: boolean = this.taskModel.validateDescription(taskDescription);
    const validateDuration: boolean = this.taskModel.validateDuration(taskDuration);
    const validatePriority: boolean = this.taskModel.validatePriority(taskPriority);
    if (!validateDescription) {
      console.log("Invalid Task Description");
    } else if (!validateDuration) {
      console.log("Invalid Task Duration");
    } else if (!validatePriority) {
      console.log("Invalid Task Priority");
    } else {
      console.log(taskDescription);
      console.log(taskDuration);
      console.log(taskPriority);

      this.taskView.setTaskDescription("");
      this.taskView.setTaskDuration("");
      this.taskView.setTaskPriority("");
    }
  };

  private buildHandlers = (): EventHandler => {
    const handler = {
      open_modal: this.openModal,
      close_modal: this.closeModal,
      submit_task: this.submitTask,
    };

    return handler;
  };

  public init = (): void => {
    const handlers: EventHandler = this.buildHandlers();
    this.taskView.registerEvent(handlers);
    this.updateDayOfWeek();
    this.updateMonthOfYear();
  };
}

export default TaskController;
