import { tab, getDateComponents } from "./utils/util";
import TaskController from "./controller/TaskController";

//initialize tab functionality
const tabContainer: HTMLElement = document.querySelector(".tab-container");
tab(tabContainer);

new TaskController().init();
