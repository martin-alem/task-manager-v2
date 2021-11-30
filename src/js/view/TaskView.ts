class TaskView {
  private dayOfWeek: HTMLElement = document.querySelector(".main-container .task-container .task .date-modal-button .date h2");
  private monthOfYear: HTMLElement = document.querySelector(".main-container .task-container .task .date-modal-button .date p");

  public set setDayOfWeek(dayOfWeek: string) {
    this.dayOfWeek.textContent = dayOfWeek;
  }

  public set setMonthOfYear(monthOfYear: string) {
    this.monthOfYear.textContent = monthOfYear;
  }
}

export default TaskView;
