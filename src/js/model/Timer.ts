class Timer {
  private static instance = null;
  private timerRunning: boolean;
  private timer: number = null;

  private duration: [number, string];
  private hourElement: HTMLElement;
  private minuteElement: HTMLElement;
  private secondElement: HTMLElement;

  private constructor(
    duration: [number, string],
    hourElement: HTMLElement,
    minuteElement: HTMLElement,
    secondElement: HTMLElement
  ) {
    this.timerRunning = false;
    this.duration = duration;
    this.hourElement = hourElement;
    this.minuteElement = minuteElement;
    this.secondElement = secondElement;
  }

  public static getInstance = (
    duration: [number, string],
    hourElement: HTMLElement,
    minuteElement: HTMLElement,
    secondElement: HTMLElement
  ): Timer => {
    if (Timer.instance == null) {
      Timer.instance = new Timer(duration, hourElement, minuteElement, secondElement);
    }
    return Timer.instance;
  };

  public timerState = (): boolean => {
    return this.timerRunning;
  };

  public startTimer = (): void => {
    this.timerRunning = true;
    let counter = 0;
    let hour: number = 0;
    let minute: number = 0;
    let second: number = 0;
    const duration = this.calculateDuration();
    this.timer = window.setInterval(() => {
      counter += 1;
      second += 1;
      this.secondElement.textContent = second.toString(10);

      if (second === 59) {
        second = 0;
        minute += 1;
        this.minuteElement.textContent = minute.toString(10);
      }

      if (minute === 59) {
        minute = 0;
        hour += 1;
        this.hourElement.textContent = hour.toString(10);
      }

      if (counter * 1000 === duration) {
        window.clearInterval(this.timer);
      }
    }, 1000);
  };
  public pauseTimer = (): void => {
    this.timerRunning = false;
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
