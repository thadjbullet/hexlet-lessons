import State from './State';

export default class {
  constructor () {
    this.clockMinutes = 0;
    this.minutes = () => this.clockMinutes;
    this.clockHours = 12;
    this.hours = () => this.clockHours;
    this.alarmRealHours = 6;
    this.alarmHours = () => this.alarmRealHours;
    this.alarmRealMinutes = 0;
    this.alarmMinutes = () => this.alarmRealMinutes;
    
    //this.isAlarmOn = State.isAlarmOn();
    //this.currentMode = () => 'clock';
  }
}