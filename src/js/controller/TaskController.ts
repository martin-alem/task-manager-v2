import TaskView from "../view/TaskView";
import { getDateComponents } from "../utils/util";
import { EventHandler } from "../types/interface";

class TaskController {
  private taskView: TaskView = new TaskView();

  private updateDayOfWeek = (): void => {
    const dayOfWeek: string = getDateComponents()[1];
    this.taskView.setDayOfWeek(dayOfWeek);
  };

  private updateMonthOfYear = (): void => {
    const dateAndMonth: string = `${getDateComponents()[0]} ${getDateComponents()[2]}`;
    this.taskView.setMonthOfYear(dateAndMonth);
  };

  private showHideModal = (event: Event): void => {
    console.log("Showing Modal");
  };

  private buildHandlers = (): EventHandler => {
    const handler = {
      modal: this.showHideModal,
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
