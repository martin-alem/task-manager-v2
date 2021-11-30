/**
 * Functions handles the tab functionality
 * @param tabContainer container holding all tabs
 */
export function tab(tabContainer: HTMLElement): void {
  let currentTab: string = "tab-0";

  const handleContainerClick = (event: Event): void => {
    const target: HTMLElement = event.target as HTMLElement;
    const domString: DOMStringMap = target.dataset;

    if (domString["tab"]) {
      const clickedTab: string = domString["tab"];
      /**
       * We could validate the value of domString[ "tab" ] to make sure it's has the format tab-<number>
       */
      if (clickedTab !== currentTab) {
        const currentTabContent: HTMLElement = document.querySelector(`.${currentTab}`);
        const newTabContent: HTMLElement = document.querySelector(`.${clickedTab}`);

        //get a reference to the current tab and remove the active-tab class
        document.querySelector(`[data-tab = '${currentTab}']`).classList.remove("active-tab");

        // always access the parentElement of the tab to remove the active-tab class
        if (target.classList.contains("tab-item-container")) {
          target.classList.add("active-tab");
        } else {
          target.parentElement.classList.add("active-tab");
        }

        currentTabContent.classList.replace("show", "hide");
        newTabContent.classList.replace("hide", "show");
        currentTab = clickedTab;
      }
    }
  };

  tabContainer.addEventListener("click", handleContainerClick);
}

export function getDateComponents(): string[] {
  const date: Date = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateAsString: string = date.getDate().toString();
  const weekDay: string = daysOfWeek[date.getDay()];
  const month: string = monthsOfYear[date.getMonth()];

  return [dateAsString, weekDay, month];
}
