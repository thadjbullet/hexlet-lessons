import AlarmState from './AlarmState';

export default class {
  constructor() {
    this.state = 'clock';
  }

  isAlarmOn() {
    return AlarmState.state;
  }
}