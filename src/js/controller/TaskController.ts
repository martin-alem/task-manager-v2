import TaskView from "../view/TaskView";
import { getDateComponents, getDurationComponents } from "../utils/util";
import { EventHandler, Task, TimerState } from "../types/interface";
import TaskModel from "../model/TaskModel";
import Timer from "../model/Timer";
import { v4 as uuid } from "uuid";

class TaskController {
  private taskView: TaskView = new TaskView();
  private taskModel: TaskModel = new TaskModel();
  private timer: Timer = null;

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
      const task: Task = {
        taskId: uuid(),
        taskDescription,
        taskDuration,
        taskPriority: parseInt(taskPriority),
        timeStamp: Date.now(),
      };

      this.taskModel.addTask(task);
      const tasks: Task[] = this.taskModel.getAllTask();
      this.taskView.renderTask(tasks);

      this.taskView.setTaskDescription("");
      this.taskView.setTaskDuration("");
      this.taskView.setTaskPriority("");
    }
  };

  private startTimer = (event: Event): void => {
    const targetElement: HTMLElement = event.target as HTMLElement;
    if (targetElement.classList.contains("icon-timer")) {
      const path: Element[] = event.composedPath() as Element[];
      const taskItem = path[4]; // this is not ideal. there must be a better way to obtain the taskItem
      const taskId: string = (taskItem as HTMLElement).dataset["key"];
      const duration = getDurationComponents(taskItem.querySelector(".duration-value").textContent);
      const hourElement = taskItem.querySelector(".hour-value") as HTMLElement;
      const minuteElement = taskItem.querySelector(".minute-value") as HTMLElement;
      const secondElement = taskItem.querySelector(".second-value") as HTMLElement;

      if (Timer.getTimerState() === TimerState.INACTIVE) {
        this.timer = Timer.getInstance(duration, hourElement, minuteElement, secondElement, taskId);
        this.timer.startTimer();
      } else if (Timer.getTimerState() === TimerState.RUNNING) {
        this.timer.pauseTimer(taskId);
      } else if (Timer.getTimerState() === TimerState.PAUSED) {
        this.timer.resumeTimer(taskId);
      }
    }
  };

  private buildHandlers = (): EventHandler => {
    const handler: EventHandler = {
      open_modal: this.openModal,
      close_modal: this.closeModal,
      submit_task: this.submitTask,
      start_timer: this.startTimer,
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
