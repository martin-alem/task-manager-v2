import { EventHandler } from "../types/interface";

class TaskView {
  private dayOfWeek: HTMLElement = document.querySelector(".main-container .task-container .task .date-modal-button .date h2");
  private monthOfYear: HTMLElement = document.querySelector(".main-container .task-container .task .date-modal-button .date p");
  private modalButton: HTMLElement = document.querySelector(".main-container .task-container .task .date-modal-button .button");
  private overlay: HTMLElement = document.querySelector(".overlay");

  public setDayOfWeek = (dayOfWeek: string) => {
    this.dayOfWeek.textContent = dayOfWeek;
  };

  public setMonthOfYear = (monthOfYear: string) => {
    this.monthOfYear.textContent = monthOfYear;
  };

  public toggleOverlay = (): void => {
    this.overlay.classList.toggle("hide");
  };

  public registerEvent = (handlers: EventHandler): void => {
    this.modalButton.addEventListener("click", handlers["modal"]);
  };
}

export default TaskView;
