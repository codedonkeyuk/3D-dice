export default class DiceNotFoundError extends Error {
  constructor(activeDiceType: string) {
    super(`The dice type "${activeDiceType}" does not exist.`);
    this.name = "DiceNotFoundError";
  }
}
