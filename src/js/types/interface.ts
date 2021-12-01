export interface EventHandler {
  [key: string]: (event: Event) => void;
}
