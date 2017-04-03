export default class {
  constructor() {
    this.onBell = false;
  }

  isBellOn() {
    return this.onBell;
  }

  turnBellOn() {
    this.onBell = true;
  }

  turnBellOff() {
    this.onBell = false;
  }
}