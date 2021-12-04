import { EventHandler, Task } from "../types/interface";

class TaskView {
  private dayOfWeek: Element = document.querySelector(".main-container .task-container .task .date-modal-button .date h2");
  private monthOfYear: Element = document.querySelector(".main-container .task-container .task .date-modal-button .date p");
  private openModalButton: Element = document.querySelector(".main-container .task-container .task .date-modal-button .button");
  private overlay: Element = document.querySelector(".overlay");
  private taskModal: Element = document.querySelector(".task_modal");
  private closeModalButton: Element = document.querySelector(".task_modal .modal_content .cancel");
  private descriptionInput: HTMLInputElement = document.querySelector("#task_description");
  private durationInput: HTMLInputElement = document.querySelector("#task_duration");
  private priorityInput: HTMLInputElement = document.querySelector("#task_priority");
  private submitButton: Element = document.querySelector("#task_submit");
  private taskList: Element = document.querySelector(".task-container .task .task-list");

  public setDayOfWeek = (dayOfWeek: string) => {
    this.dayOfWeek.textContent = dayOfWeek;
  };

  public setMonthOfYear = (monthOfYear: string) => {
    this.monthOfYear.textContent = monthOfYear;
  };

  public toggleOverlay = (): void => {
    this.overlay.classList.toggle("hide");
  };

  public getTaskModal = (): Element => {
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

  private updateDom = (element: Element, task: Task): void => {
    element.setAttribute("data-key", task["taskId"]);
    element.querySelector(".task-description").textContent = task["taskDescription"];
    element.querySelector(".priority-value").textContent = task["taskPriority"].toString(10);
    element.querySelector(".duration-value").textContent = task["taskDuration"];
  };

  public renderTask = (tasks: Task[]): void => {
    const taskItemAsString = `
              <div class="task-item">
              <p class="task-description">This is a task description</p>
              <div class="action">
                <div class="more">
                <div class="delete"><span class="material-icons delete-icon">delete</span></div>
                <div class="priority"><span class="material-icons priority-icon">fact_check</span><span class="priority-value">00</span></div>
                <div class="duration"><span class="material-icons duration-icon"> timer </span> <span class="duration-value">5m</span></div>
                </div>
                <div class="timer">
                  <div class="timer-value">
                    <span class="hour-value">00</span>:
                    <span class="minute-value">00</span>:
                    <span class="second-value">00</span>
                  </div>
                  <div class="timer-icon">
                    <span class="material-icons icon-timer"> play_arrow </span>
                  </div>
                </div>
              </div>
            </div>
    `;
    const domParser: DOMParser = new DOMParser();
    const taskDocument: Document = domParser.parseFromString(taskItemAsString, "text/html");
    const taskElement: Element = taskDocument.body.firstElementChild;

    let list: Element[] = Array.from(this.taskList.childNodes) as Array<Element>;
    list = list.slice(1);

    if (list.length === 0) {
      tasks.forEach(task => {
        this.updateDom(taskElement, task);
        this.taskList.appendChild(taskElement);
      });
    } else {
      for (let i = 0; i < list.length; i++) {
        const element: HTMLElement = list[i] as HTMLElement;
        const task: Task = tasks[i];
        if (element.dataset["key"] !== task["taskId"]) {
          this.updateDom(element as Element, task);
        }
      }

      this.updateDom(taskElement, tasks[tasks.length - 1]);
      this.taskList.appendChild(taskElement);
    }
  };

  public registerEvent = (handlers: EventHandler): void => {
    this.openModalButton.addEventListener("click", handlers["open_modal"]);
    this.closeModalButton.addEventListener("click", handlers["close_modal"]);
    this.submitButton.addEventListener("click", handlers["submit_task"]);
    this.taskList.addEventListener("click", handlers["start_timer"]);
  };
}

export default TaskView;
