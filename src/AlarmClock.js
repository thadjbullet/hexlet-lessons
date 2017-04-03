import State from './State';
import AlarmState from './AlarmState';

export default class extends State {
  constructor (clock) {
    super(clock);
    this.clockMinutes = 0;
    this.clockHours = 12;
    this.realAlarmHours = 6;
    this.realAlarmMinutes = 0;
  }

  minutes() {
    return this.clockMinutes;
  }

  alarmMinutes() {
    return this.realAlarmMinutes;
  }

  alarmHours() {
    return this.realAlarmHours;
  }

  hours() {
    return this.clockHours;
  }

  isAlarmTime() {
    if(this.realAlarmHours === this.clockHours && this.realAlarmMinutes === this.clockMinutes) {
      return true;
    } else {
      return false;
    }
  }

  clickH() {
    //console.log(this.clockHours);
    if(!this.onBell) {
      if(this.state === 'alarm') {
        this.realAlarmHours++;
        if(this.realAlarmHours >= 24) this.realAlarmHours = 0;
      } else {
        this.clockHours++;
        if(this.clockHours >= 24) this.clockHours = 0;
      }
    }
  }

  clickM() {
    if(!this.onBell) {
      if(this.state === 'alarm') {
        this.realAlarmMinutes++;
        if(this.realAlarmMinutes >= 60) this.realAlarmMinutes = 0;
      } else {
        this.clockMinutes++;
        if(this.clockMinutes >= 60) this.clockMinutes = 0;
      }
    }
  }

  tick() {
      this.clockMinutes++;
      if(this.clockMinutes >= 60) {
        this.clockMinutes = 0;
        this.clockHours++;
        if(this.clockHours >= 24) this.clockHours = 0;
      }
      if(this.clockHours === this.realAlarmHours && this.clockMinutes === this.realAlarmMinutes) {
        this.turnBellOn();
        this.clickMode();
      } else {
        this.turnBellOff();
        this.clickMode();
      }
  }

  currentMode() {
    return this.state;
  }
}