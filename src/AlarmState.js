import BellState from './BellState';

export default class extends BellState {
  constructor(clock) {
    super(clock);
    this.alarmState = false;
  }

  longClickMode() {
    if(this.alarmState === false) this.alarmState = true;
    else this.alarmState = false;
  }

  isAlarmOn() {
    return this.alarmState;
  }
}