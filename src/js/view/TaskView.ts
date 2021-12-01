import { EventHandler } from "../types/interface";

class TaskView {
  private dayOfWeek: HTMLElement = document.querySelector(".main-container .task-container .task .date-modal-button .date h2");
  private monthOfYear: HTMLElement = document.querySelector(".main-container .task-container .task .date-modal-button .date p");
  private openModalButton: HTMLElement = document.querySelector(
    ".main-container .task-container .task .date-modal-button .button"
  );
  private overlay: HTMLElement = document.querySelector(".overlay");
  private taskModal: HTMLElement = document.querySelector(".task_modal");
  private closeModalButton: HTMLElement = document.querySelector(".task_modal .modal_content .cancel");
  private descriptionInput: HTMLInputElement = document.querySelector("#task_description");
  private durationInput: HTMLInputElement = document.querySelector("#task_duration");
  private priorityInput: HTMLInputElement = document.querySelector("#task_priority");
  private submitButton: HTMLElement = document.querySelector("#task_submit");

  public setDayOfWeek = (dayOfWeek: string) => {
    this.dayOfWeek.textContent = dayOfWeek;
  };

  public setMonthOfYear = (monthOfYear: string) => {
    this.monthOfYear.textContent = monthOfYear;
  };

  public toggleOverlay = (): void => {
    this.overlay.classList.toggle("hide");
  };

  public getTaskModal = (): HTMLElement => {
    return this.taskModal;
  };

  public getTaskDescription = (): string => {
    return this.descriptionInput.value;
  };

  public setTaskDescription = (value: string): void => {
    this.descriptionInput.value = value;
  };

  public getTaskDuration = (): string => {
    return this.durationInput.value;
  };

  public setTaskDuration = (value: string): void => {
    this.durationInput.value = value;
  };

  public getTaskPriority = (): string => {
    return this.priorityInput.value;
  };

  public setTaskPriority = (value: string): void => {
    this.priorityInput.value = value;
  };

  public registerEvent = (handlers: EventHandler): void => {
    this.openModalButton.addEventListener("click", handlers["open_modal"]);
    this.closeModalButton.addEventListener("click", handlers["close_modal"]);
    this.submitButton.addEventListener("click", handlers["submit_task"]);
  };
}

export default TaskView;
