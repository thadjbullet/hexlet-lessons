import State from './State';
import AlarmState from './AlarmState';

export default class extends State {
  constructor (clock) {
    super(clock);
    this.clockMinutes = 0;
    this.clockHours = 12;
    this.alarmRealHours = 6;
    this.alarmRealMinutes = 0;
  }

  minutes() {
    return this.clockMinutes;
  }

  alarmMinutes() {
    return this.alarmRealMinutes;
  }

  alarmHours() {
    return this.alarmRealHours;
  }

  hours() {
    return this.clockHours;
  }

  isAlarmOn() {
    return AlarmState.state;
  }

  currentMode() {
    return this.state;
  }
}