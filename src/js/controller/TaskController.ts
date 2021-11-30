import TaskView from "../view/TaskView";
import { getDateComponents } from "../utils/util";

class TaskController {
  private taskView: TaskView = new TaskView();

  private updateDayOfWeek(): void {
    const dayOfWeek: string = getDateComponents()[1];
    this.taskView.setDayOfWeek = dayOfWeek;
  }

  private updateMonthOfYear(): void {
    const dateAndMonth: string = `${getDateComponents()[0]} ${getDateComponents()[2]}`;
    this.taskView.setMonthOfYear = dateAndMonth;
  }

  public init(): void {
    this.updateDayOfWeek();
    this.updateMonthOfYear();
  }
}

export default TaskController;
