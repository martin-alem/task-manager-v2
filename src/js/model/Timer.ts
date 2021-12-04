import { TimerState } from "../types/interface";

class Timer {
  private static instance = null;
  private static timerState: TimerState = TimerState.INACTIVE;
  private timer: number = null;

  private hour: number = 0;
  private minute: number = 0;
  private second: number = 0;
  private counter: number = 0;

  private duration: [number, string];
  private hourElement: HTMLElement;
  private minuteElement: HTMLElement;
  private secondElement: HTMLElement;
  private taskId: string;

  private constructor(duration: [number, string], hourElement: HTMLElement, minuteElement: HTMLElement, secondElement: HTMLElement, taskId: string) {
    this.duration = duration;
    this.hourElement = hourElement;
    this.minuteElement = minuteElement;
    this.secondElement = secondElement;
    this.taskId = taskId;
  }

  public static getInstance = (duration: [number, string], hourElement: HTMLElement, minuteElement: HTMLElement, secondElement: HTMLElement, taskId: string): Timer => {
    if (Timer.instance == null) {
      Timer.instance = new Timer(duration, hourElement, minuteElement, secondElement, taskId);
    }
    return Timer.instance;
  };

  public getHour = (): number => this.hour;
  public getMinute = (): number => this.minute;
  public getSecond = (): number => this.second;
  public static getTimerState = (): TimerState => Timer.timerState;

  public getTaskId = (): string => this.taskId;

  private setHour = (hour: number): void => {
    this.hour = hour;
  };
  private setMinute = (minute: number): void => {
    this.minute = minute;
  };
  private setSecond = (second: number): void => {
    this.second = second;
  };

  public startTimer = (): void => {
    console.log(`Task with Id: ${this.taskId} is about to use the timer`);
    Timer.timerState = TimerState.RUNNING;
    const duration = this.calculateDuration();
    this.timer = window.setInterval(() => {
      this.counter += 1;
      this.setSecond((this.second += 1));
      this.secondElement.textContent = this.second.toString(10).padStart(2, "0");

      if (this.second === 59) {
        this.setSecond(0);
        this.setMinute((this.minute += 1));
        this.minuteElement.textContent = this.minute.toString(10).padStart(2, "0");
      }

      if (this.minute === 59) {
        this.setMinute(0);
        this.setHour((this.hour += 1));
        this.hourElement.textContent = this.hour.toString(10).padStart(2, "0");
      }

      if (this.counter * 1000 === duration) {
        this.stopTimer();
        this.resetTimer();
      }
    }, 1000);
  };

  public pauseTimer = (taskId: string): void => {
    if (taskId === this.taskId) {
      console.log("Pausing the timer");
      Timer.timerState = TimerState.PAUSED;
      this.stopTimer();
    } else {
      console.log(`${this.taskId} is already using the timer`);
    }
  };

  public resumeTimer = (taskId: string): void => {
    if (taskId === this.taskId) {
      console.log("Resuming the timer");
      Timer.timerState = TimerState.RUNNING;
      this.startTimer();
    } else {
      console.log(`${this.taskId} is already using the timer`);
    }
  };

  private stopTimer = (): void => {
    window.clearInterval(this.timer);
  };

  private resetTimer = () => {
    this.setHour(0);
    this.setMinute(0);
    this.setSecond(0);

    this.hourElement.textContent = this.getHour().toString(10).padStart(2, "0");
    this.minuteElement.textContent = this.getMinute().toString(10).padStart(2, "0");
    this.secondElement.textContent = this.getSecond().toString(10).padStart(2, "0");

    Timer.timerState = TimerState.INACTIVE;
    Timer.instance = null;
  };

  private calculateDuration = (): number => {
    const duration: number = this.duration[0];
    const unit: string = this.duration[1];
    if (unit === "s") {
      return duration * 1000;
    } else if (unit === "m") {
      return duration * 60000;
    } else if (unit === "h") {
      return duration * 3.6e6;
    }
  };
}

export default Timer;
